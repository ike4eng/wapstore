"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireSuperAdmin() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,status")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.status !== "active" || profile.role !== "super_admin") {
    redirect("/unauthorized");
  }

  return { user };
}
