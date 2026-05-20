"use client";

import { ArrowRight, MessageCircle, Smartphone } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { DEMO_PRODUCTS } from "@/lib/demo";

export function Hero() {
  const demo = DEMO_PRODUCTS["kasi-kicks"];
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.06),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10 md:pb-20 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 shadow-soft">
              <Smartphone className="h-4 w-4" />
              WhatsApp-powered mini store builder
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
              Create Your WhatsApp Store In Minutes
            </h1>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-neutral-600">
              Create a mini store, upload products, and receive orders directly on
              WhatsApp — no coding, no complicated checkout.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/register" size="lg">
                Start Free <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="/store/kasi-kicks" size="lg" variant="ghost">
                View Demo Store
              </ButtonLink>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-neutral-600">
              <span className="rounded-full border border-black/10 bg-white px-3 py-2">
                Mobile-first
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-2">
                Low data usage
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-2">
                Shareable store link
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-[2.25rem] border border-black/10 bg-white p-3 shadow-soft">
              <div className="rounded-[1.9rem] border border-black/10 bg-neutral-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-white shadow-soft" />
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">
                        Naledi Fashion
                      </p>
                      <p className="text-[11px] text-neutral-500">Streetwear</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold text-neutral-700">
                    /store/naledi-fashion
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { name: demo[0]?.name ?? "Air Max Runner", price: "R1 499", img: demo[0]?.image_url ?? null },
                    { name: demo[1]?.name ?? "Street Classic Low", price: "R1 299", img: demo[1]?.image_url ?? null },
                    { name: demo[2]?.name ?? "Black Hoodie", price: "R450", img: demo[2]?.image_url ?? null },
                    { name: demo[3]?.name ?? "Everyday Cap", price: "R150", img: demo[3]?.image_url ?? null }
                  ].map((p) => (
                    <div
                      key={p.name}
                      className="rounded-2xl border border-black/10 bg-white p-3"
                    >
                      <div className="relative h-20 w-full overflow-hidden rounded-xl bg-neutral-100">
                        {p.img ? (
                          <Image
                            src={p.img}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 40vw, 180px"
                            quality={70}
                          />
                        ) : null}
                      </div>
                      <p className="mt-3 truncate text-xs font-semibold text-neutral-900">
                        {p.name}
                      </p>
                      <p className="text-xs text-neutral-600">{p.price}</p>
                      <div className="mt-3">
                        <div className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-white text-xs font-semibold text-neutral-900">
                          <MessageCircle className="h-4 w-4" />
                          Order on WhatsApp
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-black/10 bg-white p-3">
                  <p className="text-[11px] font-semibold text-neutral-900">
                    Prefilled WhatsApp message
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-neutral-600">
                    Hello, I want to order: Black Hoodie (R450)
                  </p>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.08),transparent_55%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
