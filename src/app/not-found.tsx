import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center bg-white px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold text-brand-700">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <div className="mt-6 flex justify-center">
          <ButtonLink href="/" variant="secondary">
            Go home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

