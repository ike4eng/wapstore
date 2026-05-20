import type { Product, Store } from "@/lib/db/types";

type DemoStore = Store & { demo: true };
type DemoProduct = Product & { demo: true };

const now = new Date().toISOString();

function u(id: string, width: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`;
}

export const DEMO_STORES: DemoStore[] = [
  {
    demo: true,
    id: "demo-store-kasi-kicks",
    user_id: "demo",
    store_name: "Kasi Kicks",
    slug: "kasi-kicks",
    description:
      "Fresh drops, clean classics, and everyday streetwear. Same-day dispatch in Gauteng, nationwide delivery available.",
    whatsapp_number: "27821234567",
    logo_url: u("photo-1542291026-7eec264c27ff", 200),
    banner_url: u("photo-1528701800489-20be3c6e4ef9", 1600),
    theme_color: "#111827",
    location: "Johannesburg",
    status: "active",
    is_featured: true,
    created_at: now
  },
  {
    demo: true,
    id: "demo-store-mamas-kitchen",
    user_id: "demo",
    store_name: "Mama’s Kitchen",
    slug: "mamas-kitchen",
    description:
      "Fast, tasty meals made fresh. Order for pickup or delivery — perfect for lunch breaks and late nights.",
    whatsapp_number: "2348012345678",
    logo_url: u("photo-1550547660-d9450f859349", 200),
    banner_url: u("photo-1565299624946-b28f40a0ae38", 1600),
    theme_color: "#0f172a",
    location: "Lagos",
    status: "active",
    is_featured: true,
    created_at: now
  },
  {
    demo: true,
    id: "demo-store-glow-go",
    user_id: "demo",
    store_name: "Glow & Go Beauty",
    slug: "glow-go-beauty",
    description:
      "Braids, installs, nails, and makeup — book your slot and order add-ons directly on WhatsApp.",
    whatsapp_number: "27731234567",
    logo_url: u("photo-1522335789203-aabd1fc54bc9", 200),
    banner_url: u("photo-1527799820374-dcf8d9d4a2d5", 1600),
    theme_color: "#111827",
    location: "Cape Town",
    status: "active",
    is_featured: false,
    created_at: now
  }
];

export const DEMO_PRODUCTS: Record<string, DemoProduct[]> = {
  "kasi-kicks": [
    {
      demo: true,
      id: "demo-prod-kasi-1",
      store_id: "demo-store-kasi-kicks",
      name: "Air Max Runner",
      description: "Lightweight comfort with everyday style.",
      price: 1499,
      image_url: u("photo-1542291026-7eec264c27ff", 900),
      category: "Sneakers",
      is_active: true,
      created_at: now
    },
    {
      demo: true,
      id: "demo-prod-kasi-2",
      store_id: "demo-store-kasi-kicks",
      name: "Street Classic Low",
      description: "Clean low-top silhouette, easy to match.",
      price: 1299,
      image_url: u("photo-1528701800489-20be3c6e4ef9", 900),
      category: "Sneakers",
      is_active: true,
      created_at: now
    },
    {
      demo: true,
      id: "demo-prod-kasi-3",
      store_id: "demo-store-kasi-kicks",
      name: "Black Hoodie",
      description: "Soft fleece hoodie — warm, minimal, premium feel.",
      price: 450,
      image_url: u("photo-1520975682031-a36f1f44f563", 900),
      category: "Streetwear",
      is_active: true,
      created_at: now
    },
    {
      demo: true,
      id: "demo-prod-kasi-4",
      store_id: "demo-store-kasi-kicks",
      name: "Everyday Cap",
      description: "Adjustable strap, clean embroidery finish.",
      price: 150,
      image_url: u("photo-1526481280695-3c687fd5432c", 900),
      category: "Accessories",
      is_active: true,
      created_at: now
    }
  ],
  "mamas-kitchen": [
    {
      demo: true,
      id: "demo-prod-mama-1",
      store_id: "demo-store-mamas-kitchen",
      name: "Crispy Chicken Burger",
      description: "Crispy chicken, spicy mayo, fresh slaw.",
      price: 75,
      image_url: u("photo-1550547660-d9450f859349", 900),
      category: "Burgers",
      is_active: true,
      created_at: now
    },
    {
      demo: true,
      id: "demo-prod-mama-2",
      store_id: "demo-store-mamas-kitchen",
      name: "Loaded Fries",
      description: "Cheese sauce, chicken bits, and signature spice.",
      price: 55,
      image_url: u("photo-1541592106381-b31e9677c0e5", 900),
      category: "Sides",
      is_active: true,
      created_at: now
    },
    {
      demo: true,
      id: "demo-prod-mama-3",
      store_id: "demo-store-mamas-kitchen",
      name: "Jollof Bowl",
      description: "Jollof rice with grilled chicken and plantain.",
      price: 95,
      image_url: u("photo-1565299624946-b28f40a0ae38", 900),
      category: "Meals",
      is_active: true,
      created_at: now
    },
    {
      demo: true,
      id: "demo-prod-mama-4",
      store_id: "demo-store-mamas-kitchen",
      name: "Chilled Soft Drink",
      description: "Ice-cold bottle (330ml).",
      price: 20,
      image_url: u("photo-1510626176961-4b57d4fbad03", 900),
      category: "Drinks",
      is_active: true,
      created_at: now
    }
  ],
  "glow-go-beauty": [
    {
      demo: true,
      id: "demo-prod-glow-1",
      store_id: "demo-store-glow-go",
      name: "Knotless Braids",
      description: "Neat, lightweight braids with clean finishing.",
      price: 650,
      image_url: u("photo-1527799820374-dcf8d9d4a2d5", 900),
      category: "Hair",
      is_active: true,
      created_at: now
    },
    {
      demo: true,
      id: "demo-prod-glow-2",
      store_id: "demo-store-glow-go",
      name: "Gel Nails (Set)",
      description: "Classic gel set with your preferred color.",
      price: 280,
      image_url: u("photo-1522335789203-aabd1fc54bc9", 900),
      category: "Nails",
      is_active: true,
      created_at: now
    },
    {
      demo: true,
      id: "demo-prod-glow-3",
      store_id: "demo-store-glow-go",
      name: "Soft Glam Makeup",
      description: "Natural soft glam look for events and photos.",
      price: 450,
      image_url: u("photo-1526045478516-99145907023c", 900),
      category: "Makeup",
      is_active: true,
      created_at: now
    },
    {
      demo: true,
      id: "demo-prod-glow-4",
      store_id: "demo-store-glow-go",
      name: "Hair Treatment Add-on",
      description: "Deep conditioning + scalp care add-on service.",
      price: 180,
      image_url: u("photo-1515377905703-c4788e51af15", 900),
      category: "Add-ons",
      is_active: true,
      created_at: now
    }
  ]
};

export const DEMO_TEMPLATE_SLUGS = ["kasi-kicks", "mamas-kitchen", "glow-go-beauty"] as const;

export function isDemoTemplateSlug(slug: string) {
  const normalized = slug.trim().toLowerCase();
  return DEMO_TEMPLATE_SLUGS.some((t) => normalized === t || normalized.startsWith(`${t}-`));
}

export function getDemoStoreBySlug(slug: string) {
  return DEMO_STORES.find((s) => s.slug === slug) ?? null;
}

export function getDemoProductsBySlug(slug: string) {
  return DEMO_PRODUCTS[slug] ?? [];
}
