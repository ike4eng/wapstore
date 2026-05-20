export type Role = "user" | "super_admin";
export type EntityStatus = "active" | "suspended" | "banned";
export type StoreStatus = EntityStatus | "pending_review";
export type PlanType = "free" | "premium";
export type SubscriptionStatus = "active" | "canceled" | "past_due";
export type ReportStatus = "open" | "in_review" | "resolved";

export type Profile = {
  id: string;
  email: string;
  role: Role;
  status: EntityStatus;
  created_at: string;
};

export type Store = {
  id: string;
  user_id: string;
  store_name: string;
  slug: string;
  description: string | null;
  whatsapp_number: string;
  logo_url: string | null;
  banner_url: string | null;
  theme_color: string | null;
  location: string | null;
  status: StoreStatus;
  is_featured: boolean;
  created_at: string;
};

export type Product = {
  id: string;
  store_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  is_active: boolean;
  created_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  plan_type: PlanType;
  status: SubscriptionStatus;
  created_at: string;
};

export type Announcement = {
  id: string;
  title: string;
  message: string;
  created_at: string;
};

export type Report = {
  id: string;
  reporter_id: string;
  reported_store_id: string | null;
  reported_user_id: string | null;
  reason: string;
  description: string | null;
  status: ReportStatus;
  created_at: string;
};

