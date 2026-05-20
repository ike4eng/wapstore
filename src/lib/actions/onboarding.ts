"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DEMO_PRODUCTS, DEMO_STORES, isDemoTemplateSlug } from "@/lib/demo";
import { slugify } from "@/lib/utils";

const templateSchema = z.enum(["kasi-kicks", "mamas-kitchen", "glow-go-beauty"]);

function randomSuffix() {
  return Math.random().toString(36).slice(2, 6);
}

export async function startFromDemoTemplateAction(formData: FormData) {
  let template: z.infer<typeof templateSchema>;
  try {
    template = templateSchema.parse(formData.get("template"));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid template." };
    }
    return { ok: false, message: "Invalid template." };
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not authenticated." };

  const { data: existingStore } = await supabase
    .from("stores")
    .select("id,slug")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingStore?.id) {
    redirect("/dashboard");
  }

  const demoStore = DEMO_STORES.find((s) => s.slug === template);
  if (!demoStore) return { ok: false, message: "Template not found." };

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan_type,status")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const plan =
    subscription?.status === "active" && subscription.plan_type === "premium"
      ? "premium"
      : "free";

  const baseSlug = slugify(`${demoStore.store_name}-${randomSuffix()}`);
  const slug = baseSlug || `${slugify(demoStore.store_name)}-${randomSuffix()}`;

  const { data: createdStore, error: storeError } = await supabase
    .from("stores")
    .insert({
      user_id: user.id,
      store_name: demoStore.store_name,
      slug,
      description: demoStore.description,
      whatsapp_number: demoStore.whatsapp_number,
      logo_url: demoStore.logo_url,
      banner_url: demoStore.banner_url,
      theme_color: demoStore.theme_color,
      location: demoStore.location,
      status: "active",
      is_featured: false
    })
    .select("id,slug")
    .single();

  if (storeError || !createdStore) {
    return { ok: false, message: storeError?.message ?? "Could not create store." };
  }

  const templateProducts = (DEMO_PRODUCTS[template] ?? []).filter((p) => p.is_active);
  const limitedProducts = plan === "free" ? templateProducts.slice(0, 5) : templateProducts;

  if (limitedProducts.length) {
    const { error: productError } = await supabase.from("products").insert(
      limitedProducts.map((p) => ({
        store_id: createdStore.id,
        name: p.name,
        description: p.description,
        price: p.price,
        image_url: p.image_url,
        category: p.category,
        is_active: true
      }))
    );

    if (productError) {
      return { ok: false, message: productError.message };
    }
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/store");
  revalidatePath("/dashboard/products");
  redirect("/dashboard");
}

export async function resetTemplateStoreAction(formData: FormData) {
  let storeId: string;
  try {
    storeId = z.string().uuid().parse(formData.get("store_id"));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid request." };
    }
    return { ok: false, message: "Invalid request." };
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not authenticated." };

  const { data: store } = await supabase
    .from("stores")
    .select("id,user_id,slug,store_name")
    .eq("id", storeId)
    .maybeSingle();

  if (!store || store.user_id !== user.id) {
    return { ok: false, message: "Store not found." };
  }

  const eligible =
    isDemoTemplateSlug(store.slug) ||
    DEMO_STORES.some((s) => s.store_name === store.store_name);

  if (!eligible) {
    return { ok: false, message: "This store isn’t eligible for template reset." };
  }

  const { error: deleteError } = await supabase
    .from("products")
    .delete()
    .eq("store_id", store.id);
  if (deleteError) return { ok: false, message: deleteError.message };

  const { error: updateError } = await supabase
    .from("stores")
    .update({
      description: null,
      logo_url: null,
      banner_url: null,
      theme_color: null,
      location: null,
      is_featured: false
    })
    .eq("id", store.id);
  if (updateError) return { ok: false, message: updateError.message };

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/store");
  revalidatePath("/dashboard/products");
  revalidatePath(`/store/${store.slug}`);

  return { ok: true, message: "Template content cleared. Add your own products now." };
}
