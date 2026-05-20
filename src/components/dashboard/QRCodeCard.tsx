"use client";

import * as React from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function QRCodeCard({ url }: { url: string }) {
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    void QRCode.toDataURL(url, {
      width: 640,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#0a0a0a", light: "#ffffff" }
    }).then((d) => {
      if (!cancelled) setDataUrl(d);
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <Card>
      <CardHeader>
        <p className="text-sm font-semibold text-neutral-900">Store QR code</p>
        <p className="text-sm text-neutral-600">
          Print it or share it for quick access.
        </p>
      </CardHeader>
      <CardContent>
        {dataUrl ? (
          <div className="flex items-center gap-4">
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <Image src={dataUrl} alt="QR code" fill className="object-contain" />
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                const a = document.createElement("a");
                a.href = dataUrl;
                a.download = "wapstore-qr.png";
                a.click();
              }}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        ) : (
          <div className="h-28 w-28 rounded-2xl bg-neutral-100" />
        )}
      </CardContent>
    </Card>
  );
}

