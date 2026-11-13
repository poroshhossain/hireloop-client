import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Form primitives                                                            */
/*                                                                            */
/* Shared form field building blocks extracted from NewJobForm so every       */
/* dashboard form (settings, company profile, job post) renders identically.  */
/* Spec: dark control + primary focus ring ("HL 2.0/Inputs").                 */
/* -------------------------------------------------------------------------- */

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
};

/** Label + control + error/hint wrapper. Children must fill the control. */
export function Field({ label, error, hint, className, children }: FieldProps) {
  return (
    <label className={cn("block", className)}>
      <span className="text-sm font-medium text-light/80">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-light/40">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

/** Base classes for text-like controls (input, textarea). */
export const controlClass = cn(
  "mt-1.5 w-full rounded-lg border border-border-color/30 bg-dark-secoundary/60 px-3 text-sm text-light",
  "outline-none transition-colors placeholder:text-light/35",
  "focus:border-primary-color/60 focus:ring-3 focus:ring-primary-color/20",
);

/** Input on top of controlClass — pass type, register, etc. */
export const inputClass = cn(controlClass, "h-10");

/** Textarea variant — auto height, resizable. */
export const textareaClass = cn(controlClass, "h-auto resize-y py-2.5 leading-relaxed");

/** Native select with a custom chevron (selects can't use ::after). */
export const selectClass = cn(
  inputClass,
  "cursor-pointer appearance-none bg-[position:right_0.75rem_center] bg-no-repeat",
);

export function FormSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      {...props}
      className={cn(selectClass, className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff88' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
