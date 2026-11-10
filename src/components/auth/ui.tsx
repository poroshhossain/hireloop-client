import type { InputHTMLAttributes,ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "cn";

/* --------------------------------- fields --------------------------------- */

export function AuthField({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string, error?: string; }) {
  return (
    <label className={cn("block", className)}>
      <span className="text-sm font-medium text-light/80">{label}</span>
      <input
        className="mt-1.5 h-10 w-full rounded-lg border border-border-color/30 bg-dark-secoundary/60 px-3 text-sm text-light outline-none transition-colors placeholder:text-light/35 focus:border-primary-color/60 focus:ring-3 focus:ring-primary-color/20"
        {...props}
      />
    </label>
  );
}

/* ------------------------------ submit button ----------------------------- */


interface AuthSubmitProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function AuthSubmit({
  children,
  ...props
}: AuthSubmitProps) {
  return (
    <button
      {...props}
      type="submit"
      className={`inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary-color text-sm font-semibold text-light shadow-[0_8px_24px_-8px_var(--primary)] transition-[filter] hover:brightness-110 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

/* ------------------------- social auth (UI only) -------------------------- */

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 5.29c1.56 0 2.96.54 4.06 1.6l3.02-3.02C17.19 2.08 14.79 1 12 1 7.7 1 4 3.42 2.18 6.96l3.53 2.74C6.55 7.06 9.03 5.29 12 5.29z"
      />
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45c-.28 1.48-1.12 2.73-2.39 3.58l3.45 2.68c2.02-1.86 3.99-4.6 3.99-8.45z"
      />
      <path
        fill="#FBBC05"
        d="M5.71 14.3A7.36 7.36 0 0 1 5.32 12c0-.8.14-1.57.39-2.3L2.18 6.96A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 5.04l3.53-2.74z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.45-2.68c-.96.65-2.19 1.03-3.83 1.03-2.97 0-5.45-1.77-6.29-4.4l-3.53 2.73C3.99 20.56 7.69 23 12 23z"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("size-4", className)} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.53-1.32-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export function SocialAuthRow() {
  const providers = [
    { label: "Google", icon: <GoogleIcon /> },
    { label: "GitHub", icon: <GitHubIcon /> },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {providers.map(({ label, icon }) => (
        <button
          key={label}
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border-color/30 bg-dark-secoundary/60 text-sm font-medium text-light/85 transition-colors hover:border-border-color/60 hover:bg-dark-secoundary hover:text-light"
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-px flex-1 bg-light/10" />
      <span className="text-xs text-light/40">or continue with</span>
      <span aria-hidden="true" className="h-px flex-1 bg-light/10" />
    </div>
  );
}

/* ------------------------------ small helpers ----------------------------- */

export function AuthCardHeading({
  title,
  description,
  children,
}: {
  title: string;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-light sm:text-3xl">
        {title}
      </h1>
      <div className="mt-2 text-sm text-light/55">{description}</div>
      {children}
    </div>
  );
}
