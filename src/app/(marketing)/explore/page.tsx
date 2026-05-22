import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExploreClient } from "@/components/explore/ExploreClient";
import { DEMO_STORES } from "@/lib/demo";

export const metadata = {
  title: "Explore stores"
};

export default async function ExplorePage() {
  const supabase = await createSupabaseServerClient();

  const { data: featured } = await supabase
    .from("stores")
    .select("*")
    .eq("status", "active")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  const { data: newest } = await supabase
    .from("stores")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(40);

  const fallbackFeatured = DEMO_STORES.filter((s) => s.is_featured);
  const fallbackNewest = DEMO_STORES;

  return (
    <ExploreClient
      featured={((featured as any) ?? []).length ? ((featured as any) ?? []) : (fallbackFeatured as any)}
      newest={((newest as any) ?? []).length ? ((newest as any) ?? []) : (fallbackNewest as any)}
    />
  );
}
