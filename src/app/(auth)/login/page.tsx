import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Log in"
};

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<{ redirectTo?: string }>;
}) {
  const sp = await searchParams;
  return <LoginForm redirectTo={sp?.redirectTo} />;
}
