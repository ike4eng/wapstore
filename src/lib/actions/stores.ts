"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

const storeSchema = z.object({
  store_name: z.string().min(2).max(60),
  slug: z
    .string()
    .min(2)
    .max(60)
    .transform((s) => slugify(s)),
  description: z.string().max(500).optional().or(z.literal("")),
  whatsapp_number: z.string().min(6).max(30),
  logo_url: z.string().url().optional().or(z.literal("")),
  banner_url: z.string().url().optional().or(z.literal("")),
  theme_color: z.string().max(20).optional().or(z.literal("")),
  location: z.string().max(80).optional().or(z.literal(""))
});

export async function upsertMyStoreAction(formData: FormData) {
  let input: z.infer<typeof storeSchema>;
  try {
    input = storeSchema.parse({
      store_name: formData.get("store_name"),
      slug: formData.get("slug"),
      description: formData.get("description") ?? "",
      whatsapp_number: formData.get("whatsapp_number"),
      logo_url: formData.get("logo_url") ?? "",
      banner_url: formData.get("banner_url") ?? "",
      theme_color: formData.get("theme_color") ?? "",
      location: formData.get("location") ?? ""
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid input." };
    }
    return { ok: false, message: "Could not save store settings." };
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not authenticated." };

  const { data: existingSlug } = await supabase
    .from("stores")
    .select("id,user_id")
    .eq("slug", input.slug)
    .maybeSingle();

  if (existingSlug && existingSlug.user_id !== user.id) {
    return { ok: false, message: "This store link is already taken." };
  }

  const { data: existingStore } = await supabase
    .from("stores")
    .select("id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const payload = {
    user_id: user.id,
    store_name: input.store_name,
    slug: input.slug,
    description: input.description || null,
    whatsapp_number: input.whatsapp_number,
    logo_url: input.logo_url || null,
    banner_url: input.banner_url || null,
    theme_color: input.theme_color || null,
    location: input.location || null
  };

  const { error } = existingStore?.id
    ? await supabase.from("stores").update(payload).eq("id", existingStore.id)
    : await supabase.from("stores").insert({ ...payload, status: "active" });

  if (error) return { ok: false, message: error.message };
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/store");
  return { ok: true, message: "Store saved." };
}
