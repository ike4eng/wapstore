import { ButtonLink } from "@/components/ui/button";

export const metadata = {
  title: "Unauthorized",
  description: "You don’t have access to this page."
};

export default function UnauthorizedPage() {
  return (
    <div className="grid min-h-[70dvh] place-items-center px-4 py-12">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold text-neutral-600">Access denied</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">
          You don’t have permission to view this page
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          If you think this is a mistake, log in with the correct account.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <ButtonLink href="/login" variant="secondary">
            Login
          </ButtonLink>
          <ButtonLink href="/">Go home</ButtonLink>
        </div>
      </div>
    </div>
  );
}

