import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* StatCard                                                                   */
/*                                                                            */
/* One metric tile used across dashboards — icon, label, value and an         */
/* optional up/down trend delta.                                              */
/* -------------------------------------------------------------------------- */

type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  /** e.g. "+12%" — paired with `trend` to pick the color/icon. */
  delta?: string;
  trend?: "up" | "down";
  /** Extra context line, e.g. "this week". */
  hint?: string;
  className?: string;
};

const StatCard = ({ label, value, icon: Icon, delta, trend, hint, className }: StatCardProps) => {
  const TrendIcon = trend === "down" ? TrendingDown : TrendingUp;

  return (
    <div
      className={cn(
        "rounded-xl border border-border-color/10 bg-dark-secoundary/40 p-5",
        "transition-colors hover:border-primary-color/30",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-light/55">{label}</span>
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-color/15 text-primary-color">
          <Icon className="size-4.5" />
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="text-2xl font-semibold tracking-tight text-light">
          {value}
        </span>

        {delta && (
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-medium",
              trend === "down" ? "text-red-400" : "text-emerald-400",
            )}
          >
            <TrendIcon className="size-3.5" />
            {delta}
          </span>
        )}
      </div>

      {hint && <p className="mt-1 text-xs text-light/40">{hint}</p>}
    </div>
  );
};

export default StatCard;
