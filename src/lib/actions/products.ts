"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const priceSchema = z
  .string()
  .transform((v) => v.replace(/[^\d.]/g, ""))
  .refine((v) => v.length > 0, "Price is required")
  .transform((v) => Number(v))
  .refine((n) => Number.isFinite(n) && n >= 0, "Invalid price");

const productSchema = z.object({
  store_id: z.string().uuid(),
  name: z.string().min(2).max(80),
  description: z.string().max(500).optional().or(z.literal("")),
  category: z.string().max(40).optional().or(z.literal("")),
  price: priceSchema,
  image_url: z.string().url().optional().or(z.literal("")),
  is_active: z
    .union([z.literal("on"), z.literal("true"), z.literal("false"), z.literal("")])
    .optional()
});

const productUpdateSchema = productSchema.omit({ store_id: true });

async function getPlanForUser(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  userId: string
) {
  const { data } = await supabase
    .from("subscriptions")
    .select("plan_type,status")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (data?.status === "active" && data.plan_type === "premium") return "premium" as const;
  return "free" as const;
}

export async function createProductAction(formData: FormData) {
  let input: z.infer<typeof productSchema>;
  try {
    input = productSchema.parse({
      store_id: formData.get("store_id"),
      name: formData.get("name"),
      description: formData.get("description") ?? "",
      category: formData.get("category") ?? "",
      price: formData.get("price"),
      image_url: formData.get("image_url") ?? "",
      is_active: formData.get("is_active") ?? "true"
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, code: "VALIDATION", message: e.issues[0]?.message ?? "Invalid input." };
    }
    return { ok: false, code: "VALIDATION", message: "Invalid input." };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, code: "AUTH", message: "Not authenticated." };

  const { data: store } = await supabase
    .from("stores")
    .select("id,user_id")
    .eq("id", input.store_id)
    .maybeSingle();

  if (!store || store.user_id !== user.id) {
    return { ok: false, code: "OWNERSHIP", message: "Invalid store." };
  }

  const plan = await getPlanForUser(supabase, user.id);
  if (plan === "free") {
    const { count } = await supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("store_id", input.store_id);

    if ((count ?? 0) >= 5) {
      return {
        ok: false,
        code: "LIMIT",
        message: "Free plan allows up to 5 products. Upgrade to add more."
      };
    }
  }

  const { error } = await supabase.from("products").insert({
    store_id: input.store_id,
    name: input.name,
    description: input.description || null,
    category: input.category || null,
    price: input.price,
    image_url: input.image_url || null,
    is_active: input.is_active !== "false"
  });

  if (error) return { ok: false, code: "DB", message: error.message };
  revalidatePath("/dashboard/products");
  return { ok: true };
}

export async function updateProductAction(formData: FormData) {
  let id: string;
  let input: z.infer<typeof productUpdateSchema>;
  try {
    id = z.string().uuid().parse(formData.get("id"));
    input = productUpdateSchema.parse({
      name: formData.get("name"),
      description: formData.get("description") ?? "",
      category: formData.get("category") ?? "",
      price: formData.get("price"),
      image_url: formData.get("image_url") ?? "",
      is_active: formData.get("is_active") ?? "true"
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid input." };
    }
    return { ok: false, message: "Invalid input." };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not authenticated." };

  const { data: product } = await supabase
    .from("products")
    .select("id,store_id,stores(user_id)")
    .eq("id", id)
    .maybeSingle();

  const ownerId = (product as any)?.stores?.user_id as string | undefined;
  if (!product || ownerId !== user.id) return { ok: false, message: "Not allowed." };

  const { error } = await supabase
    .from("products")
    .update({
      name: input.name,
      description: input.description || null,
      category: input.category || null,
      price: input.price,
      image_url: input.image_url || null,
      is_active: input.is_active !== "false"
    })
    .eq("id", id);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/dashboard/products");
  return { ok: true };
}

export async function deleteProductAction(formData: FormData) {
  let id: string;
  try {
    id = z.string().uuid().parse(formData.get("id"));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid request." };
    }
    return { ok: false, message: "Invalid request." };
  }
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not authenticated." };

  const { data: product } = await supabase
    .from("products")
    .select("id,stores(user_id)")
    .eq("id", id)
    .maybeSingle();

  const ownerId = (product as any)?.stores?.user_id as string | undefined;
  if (!product || ownerId !== user.id) return { ok: false, message: "Not allowed." };

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/dashboard/products");
  return { ok: true };
}

export async function toggleProductActiveAction(formData: FormData) {
  let id: string;
  let is_active: boolean;
  try {
    id = z.string().uuid().parse(formData.get("id"));
    is_active = z
      .union([z.literal("true"), z.literal("false")])
      .transform((v) => v === "true")
      .parse(formData.get("is_active"));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid request." };
    }
    return { ok: false, message: "Invalid request." };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not authenticated." };

  const { data: product } = await supabase
    .from("products")
    .select("id,stores(user_id)")
    .eq("id", id)
    .maybeSingle();

  const ownerId = (product as any)?.stores?.user_id as string | undefined;
  if (!product || ownerId !== user.id) return { ok: false, message: "Not allowed." };

  const { error } = await supabase
    .from("products")
    .update({ is_active })
    .eq("id", id);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/dashboard/products");
  return { ok: true };
}
