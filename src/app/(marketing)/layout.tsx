import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function MarketingLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: store } = user
    ? await supabase
        .from("stores")
        .select("slug")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
    : { data: null };

  return (
    <div className="min-h-dvh bg-white">
      <MarketingNav
        isAuthenticated={!!user}
        userEmail={user?.email ?? null}
        storeSlug={(store as any)?.slug ?? null}
      />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
