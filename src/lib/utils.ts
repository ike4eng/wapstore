import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoneyZAR(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function normalizeWhatsappNumber(raw: string) {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return "";
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0")) return digits.slice(1);
  return digits;
}

export function waMeLink(whatsappNumber: string, message: string) {
  const num = normalizeWhatsappNumber(whatsappNumber);
  const text = encodeURIComponent(message);
  return `https://wa.me/${num}?text=${text}`;
}

