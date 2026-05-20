"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireSuperAdmin } from "@/lib/data/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function setStoreStatusAction(formData: FormData) {
  let storeId: string;
  let status: "active" | "suspended" | "banned" | "pending_review";
  try {
    storeId = z.string().uuid().parse(formData.get("store_id"));
    status = z
      .enum(["active", "suspended", "banned", "pending_review"])
      .parse(formData.get("status"));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid request." };
    }
    return { ok: false, message: "Invalid request." };
  }

  const { user } = await requireSuperAdmin();
  const admin = createSupabaseAdminClient();

  const { error } = await admin.from("stores").update({ status }).eq("id", storeId);
  if (error) return { ok: false, message: error.message };

  await admin.from("admin_logs").insert({
    admin_id: user.id,
    action: `store.status:${status}`,
    target_id: storeId
  });

  revalidatePath("/super-admin/stores");
  return { ok: true };
}

export async function setStoreFeaturedAction(formData: FormData) {
  let storeId: string;
  let is_featured: boolean;
  try {
    storeId = z.string().uuid().parse(formData.get("store_id"));
    is_featured = z
      .union([z.literal("true"), z.literal("false")])
      .transform((v) => v === "true")
      .parse(formData.get("is_featured"));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid request." };
    }
    return { ok: false, message: "Invalid request." };
  }

  const { user } = await requireSuperAdmin();
  const admin = createSupabaseAdminClient();

  const { error } = await admin
    .from("stores")
    .update({ is_featured })
    .eq("id", storeId);
  if (error) return { ok: false, message: error.message };

  await admin.from("admin_logs").insert({
    admin_id: user.id,
    action: `store.featured:${is_featured}`,
    target_id: storeId
  });

  revalidatePath("/super-admin/stores");
  revalidatePath("/explore");
  return { ok: true };
}

export async function deleteStoreAction(formData: FormData) {
  let storeId: string;
  try {
    storeId = z.string().uuid().parse(formData.get("store_id"));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid request." };
    }
    return { ok: false, message: "Invalid request." };
  }
  const { user } = await requireSuperAdmin();
  const admin = createSupabaseAdminClient();

  const { error } = await admin.from("stores").delete().eq("id", storeId);
  if (error) return { ok: false, message: error.message };

  await admin.from("admin_logs").insert({
    admin_id: user.id,
    action: "store.delete",
    target_id: storeId
  });

  revalidatePath("/super-admin/stores");
  return { ok: true };
}

export async function setUserStatusAction(formData: FormData) {
  let profileId: string;
  let status: "active" | "suspended" | "banned";
  try {
    profileId = z.string().uuid().parse(formData.get("profile_id"));
    status = z
      .enum(["active", "suspended", "banned"])
      .parse(formData.get("status"));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid request." };
    }
    return { ok: false, message: "Invalid request." };
  }

  const { user } = await requireSuperAdmin();
  const admin = createSupabaseAdminClient();

  const { error } = await admin.from("profiles").update({ status }).eq("id", profileId);
  if (error) return { ok: false, message: error.message };

  await admin.from("admin_logs").insert({
    admin_id: user.id,
    action: `user.status:${status}`,
    target_id: profileId
  });

  revalidatePath("/super-admin/users");
  return { ok: true };
}

export async function deleteUserAction(formData: FormData) {
  let profileId: string;
  try {
    profileId = z.string().uuid().parse(formData.get("profile_id"));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid request." };
    }
    return { ok: false, message: "Invalid request." };
  }
  const { user } = await requireSuperAdmin();
  const admin = createSupabaseAdminClient();

  await admin.from("profiles").delete().eq("id", profileId);
  await admin.auth.admin.deleteUser(profileId);

  await admin.from("admin_logs").insert({
    admin_id: user.id,
    action: "user.delete",
    target_id: profileId
  });

  revalidatePath("/super-admin/users");
  return { ok: true };
}

export async function resolveReportAction(formData: FormData) {
  let reportId: string;
  let status: "open" | "in_review" | "resolved";
  try {
    reportId = z.string().uuid().parse(formData.get("report_id"));
    status = z.enum(["open", "in_review", "resolved"]).parse(formData.get("status"));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid request." };
    }
    return { ok: false, message: "Invalid request." };
  }

  const { user } = await requireSuperAdmin();
  const admin = createSupabaseAdminClient();

  const { error } = await admin.from("reports").update({ status }).eq("id", reportId);
  if (error) return { ok: false, message: error.message };

  await admin.from("admin_logs").insert({
    admin_id: user.id,
    action: `report.status:${status}`,
    target_id: reportId
  });

  revalidatePath("/super-admin/reports");
  return { ok: true };
}

export async function createAnnouncementAction(formData: FormData) {
  let title: string;
  let message: string;
  try {
    title = z.string().min(2).max(80).parse(formData.get("title"));
    message = z.string().min(2).max(500).parse(formData.get("message"));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid input." };
    }
    return { ok: false, message: "Invalid input." };
  }

  const { user } = await requireSuperAdmin();
  const admin = createSupabaseAdminClient();

  const { data, error } = await admin
    .from("announcements")
    .insert({ title, message })
    .select("id")
    .single();

  if (error) return { ok: false, message: error.message };

  await admin.from("admin_logs").insert({
    admin_id: user.id,
    action: "announcement.create",
    target_id: data.id
  });

  revalidatePath("/super-admin/announcements");
  revalidatePath("/dashboard");
  return { ok: true };
}
