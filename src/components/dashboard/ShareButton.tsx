"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButton({
  url,
  title = "My Wapstore",
  text = "Check out my store"
}: {
  url: string;
  title?: string;
  text?: string;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={async () => {
        if (navigator.share) {
          await navigator.share({ title, text, url });
        } else {
          await navigator.clipboard.writeText(url);
        }
      }}
    >
      <Share2 className="h-4 w-4" />
      Share
    </Button>
  );
}

