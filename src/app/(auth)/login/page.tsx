import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Log in"
};

export default function LoginPage({
  searchParams
}: {
  searchParams?: { redirectTo?: string };
}) {
  return <LoginForm redirectTo={searchParams?.redirectTo} />;
}
