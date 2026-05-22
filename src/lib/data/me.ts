"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile, Store, Subscription } from "@/lib/db/types";

export async function requireUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

export async function getMyProfile(): Promise<Profile | null> {
  const { supabase, user } = await requireUser();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  return (data as Profile | null) ?? null;
}

export async function getMySubscription(): Promise<Subscription | null> {
  const { supabase, user } = await requireUser();
  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data as Subscription | null) ?? null;
}

export async function getMyStore(): Promise<Store | null> {
  const { supabase, user } = await requireUser();
  const { data } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data as Store | null) ?? null;
}
