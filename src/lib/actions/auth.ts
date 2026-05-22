"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { publicEnv } from "@/lib/env";

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8);

export async function signUpAction(formData: FormData) {
  try {
    const email = emailSchema.parse(formData.get("email"));
    const password = passwordSchema.parse(formData.get("password"));

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return { ok: false, message: error.message };
    }

    redirect("/dashboard");
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid input." };
    }
    return { ok: false, message: "Could not sign up. Please try again." };
  }
}

export async function signInAction(formData: FormData) {
  try {
    const email = emailSchema.parse(formData.get("email"));
    const password = z.string().min(1).parse(formData.get("password"));
    const redirectTo = z
      .string()
      .optional()
      .parse(formData.get("redirectTo") ?? undefined);

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { ok: false, message: error.message };
    }

    redirect(redirectTo || "/dashboard");
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid input." };
    }
    return { ok: false, message: "Could not log in. Please try again." };
  }
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function requestPasswordResetAction(formData: FormData) {
  try {
    const email = emailSchema.parse(formData.get("email"));
    const { appUrl } = publicEnv();

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${appUrl}/auth/callback?next=/reset-password`
    });

    if (error) {
      return { ok: false, message: error.message };
    }

    return { ok: true, message: "Check your email for a reset link." };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid input." };
    }
    return { ok: false, message: "Could not request reset link." };
  }
}

export async function updatePasswordAction(formData: FormData) {
  try {
    const password = passwordSchema.parse(formData.get("password"));
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return { ok: false, message: error.message };
    }

    redirect("/dashboard");
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, message: e.issues[0]?.message ?? "Invalid input." };
    }
    return { ok: false, message: "Could not update password." };
  }
}
