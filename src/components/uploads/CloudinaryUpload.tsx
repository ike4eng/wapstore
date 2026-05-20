"use client";

import * as React from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type UploadResult = { secure_url: string };

export function CloudinaryUpload({
  value,
  onChange,
  folder = "wapstore",
  label = "Upload image"
}: {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  label?: string;
}) {
  const [uploading, setUploading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  async function upload(file: File) {
    setUploading(true);
    try {
      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder })
      });
      if (!signRes.ok) throw new Error("Could not sign upload.");
      const { timestamp, signature, apiKey, cloudName, folder: signedFolder } =
        (await signRes.json()) as {
          timestamp: number;
          signature: string;
          apiKey: string;
          cloudName: string;
          folder: string;
        };

      const form = new FormData();
      form.append("file", file);
      form.append("api_key", apiKey);
      form.append("timestamp", String(timestamp));
      form.append("signature", signature);
      form.append("folder", signedFolder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: form }
      );
      if (!uploadRes.ok) throw new Error("Upload failed.");
      const json = (await uploadRes.json()) as UploadResult;
      onChange(json.secure_url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-900">{label}</p>
        {value ? (
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-xl px-2 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
            onClick={() => onChange(null)}
          >
            <X className="h-4 w-4" />
            Remove
          </button>
        ) : null}
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        {value ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-100">
            <Image
              src={value}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 92vw, 512px"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-neutral-50 py-10 text-sm text-neutral-600">
            <ImagePlus className="h-5 w-5 text-neutral-500" />
            <p>JPG/PNG recommended</p>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void upload(f);
            }}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                <ImagePlus className="h-4 w-4" />
                Choose file
              </>
            )}
          </Button>
          {value ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => window.open(value, "_blank")}
              disabled={uploading}
            >
              View
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

