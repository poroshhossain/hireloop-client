import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* StatusBadge                                                                */
/*                                                                            */
/* Small colored pill for application / job statuses. The color map is the    */
/* single source of truth so every dashboard shows statuses the same way.     */
/* -------------------------------------------------------------------------- */

type ApplicationStatus =
  | "new"
  | "shortlisted"
  | "interview"
  | "hired"
  | "rejected";

type StatusBadgeProps = {
  status: ApplicationStatus | string;
  className?: string;
};

/** Status → pill colors. Unknown statuses fall back to neutral. */
const STATUS_STYLES: Record<string, string> = {
  new: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  shortlisted: "border-primary-color/30 bg-primary-color/10 text-primary-color",
  interview: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  hired: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  rejected: "border-red-400/30 bg-red-400/10 text-red-300",
  /* job post statuses (Manage Jobs) */
  active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  paused: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  draft: "border-border-color/20 bg-light/5 text-light/70",
  closed: "border-red-400/30 bg-red-400/10 text-red-300",
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const key = status.toLowerCase();

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5",
        "text-xs font-medium capitalize",
        STATUS_STYLES[key] ?? "border-border-color/20 bg-light/5 text-light/70",
        className,
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
