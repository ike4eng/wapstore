import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SupportForm } from "@/components/dashboard/SupportForm";
import { requireUser } from "@/lib/data/me";
import { EmptyState } from "@/components/ui/empty-state";
import { LifeBuoy } from "lucide-react";

export const metadata = {
  title: "Support"
};

export default async function SupportPage() {
  const { supabase, user } = await requireUser();

  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("reporter_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Reports & Support
        </h1>
        <p className="text-sm text-neutral-600">
          Report abusive behavior or contact support.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Submit a report</p>
            <p className="text-sm text-neutral-600">
              Send details to the Wapstore team.
            </p>
          </CardHeader>
          <CardContent>
            <SupportForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm font-semibold text-neutral-900">Your tickets</p>
            <p className="text-sm text-neutral-600">Recent submissions</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {reports?.length ? (
              reports.map((r) => (
                <div
                  key={r.id}
                  className="rounded-2xl border border-neutral-200 bg-white px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-neutral-900">{r.reason}</p>
                    <Badge
                      variant={
                        r.status === "resolved"
                          ? "success"
                          : r.status === "in_review"
                            ? "warning"
                            : "neutral"
                      }
                    >
                      {r.status}
                    </Badge>
                  </div>
                  {r.description ? (
                    <p className="mt-2 text-sm text-neutral-600">{r.description}</p>
                  ) : null}
                </div>
              ))
            ) : (
              <EmptyState
                icon={LifeBuoy}
                title="No tickets yet"
                description="When you submit a report or support request, it will appear here."
                secondaryAction={{ label: "View demo store", href: "/store/glow-go-beauty" }}
                className="bg-white"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
