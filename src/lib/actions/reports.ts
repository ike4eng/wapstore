"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const reportSchema = z.object({
  reason: z.string().min(2).max(60),
  description: z.string().max(1000).optional().or(z.literal(""))
});

export async function createSupportReportAction(formData: FormData) {
  let input: z.infer<typeof reportSchema>;
  try {
    input = reportSchema.parse({
      reason: formData.get("reason"),
      description: formData.get("description") ?? ""
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

  const { error } = await supabase.from("reports").insert({
    reporter_id: user.id,
    reported_store_id: null,
    reported_user_id: null,
    reason: input.reason,
    description: input.description || null,
    status: "open"
  });

  if (error) return { ok: false, message: error.message };
  revalidatePath("/dashboard/support");
  return { ok: true, message: "Sent. Support will respond soon." };
}
