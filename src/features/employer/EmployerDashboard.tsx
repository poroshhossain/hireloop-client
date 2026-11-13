import Link from "next/link";
import { ArrowUpRight, ChevronRight, Eye, SquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import Card from "@/features/dashboard/Card";
import PageHeader from "@/features/dashboard/PageHeader";
import StatCard from "@/features/dashboard/StatCard";
import StatusBadge from "@/features/dashboard/StatusBadge";
import {
  employerStats,
  jobPerformance,
  recentApplications,
  weeklyApplications,
} from "./dashboard-data";

/* -------------------------------------------------------------------------- */
/* Recent applications                                                        */
/* -------------------------------------------------------------------------- */

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Match % → label color (higher = stronger candidate-job fit). */
const matchColor = (match: number) =>
  match >= 85 ? "text-emerald-400" : match >= 70 ? "text-primary-color" : "text-amber-400";

function RecentApplications() {
  return (
    <Card
      title="Recent Applications"
      action={
        <span className="flex items-center gap-2">
          <span className="rounded-full bg-primary-color/15 px-2 py-0.5 text-xs font-semibold text-primary-color">
            {recentApplications.length}
          </span>
          <Link
            href="/dashboard/employer/applications"
            className="flex items-center gap-1 text-sm font-medium text-primary-color transition-colors hover:brightness-110"
          >
            View all
            <ArrowUpRight className="size-3.5" />
          </Link>
        </span>
      }
    >
      <ul className="mt-3 space-y-1">
        {recentApplications.map(({ id, name, role, appliedAt, match, status }) => {
          const initials =
            name
              .split(/\s+/)
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "U";

          return (
            <li key={id}>
              {/* whole row is one tap target → straight into the applicant */}
              <Link
                href="/dashboard/employer/applications"
                className="group flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-light/5"
              >
                {/* avatar */}
                <span
                  className={cn(
                    "flex size-10 shrink-0 place-items-center rounded-full",
                    "bg-linear-to-br from-primary-color/40 to-primary-color/10",
                    "ring-1 ring-primary-color/25",
                    "text-xs font-bold text-light",
                  )}
                >
                  {initials}
                </span>

                {/* identity + meta */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-light transition-colors group-hover:text-white">
                    {name}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 truncate text-xs text-light/50">
                    <span className="truncate">{role}</span>
                    <span aria-hidden="true" className="text-light/25">·</span>
                    <span className={cn("font-semibold", matchColor(match))}>
                      {match}% match
                    </span>
                    <span aria-hidden="true" className="text-light/25">·</span>
                    <span className="shrink-0">{appliedAt}</span>
                  </p>
                </div>

                {/* status + hover affordance */}
                <StatusBadge status={status} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
                <ChevronRight
                  aria-hidden="true"
                  className="size-4 shrink-0 -translate-x-1 text-light/30 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* footer CTA — clearer than a lone text link */}
      <Link
        href="/dashboard/employer/applications"
        className={cn(
          "mt-4 flex h-9 items-center justify-center gap-2 rounded-lg border border-border-color/20",
          "text-sm font-medium text-light/70 transition-colors",
          "hover:border-primary-color/40 hover:bg-primary-color/10 hover:text-light",
        )}
      >
        View all applications
        <ArrowUpRight className="size-3.5" />
      </Link>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Applications this week (pure-CSS mini bar chart)                           */
/* -------------------------------------------------------------------------- */

function WeeklyApplications() {
  const max = Math.max(...weeklyApplications);

  return (
    <Card title="Applications This Week">
      <p className="mt-1 text-sm text-light/55">
        <span className="text-lg font-semibold text-light">388</span> total ·{" "}
        <span className="text-emerald-400">+16%</span> vs last week
      </p>

      <div className="mt-5 flex h-32 items-end justify-between gap-2 sm:gap-3">
        {weeklyApplications.map((value, index) => (
          <div key={index} className="flex h-full min-w-0 flex-1 flex-col items-center gap-2">
            <div className="flex h-full w-full items-end">
              <div
                className={cn(
                  "w-full rounded-t-md transition-all",
                  index === 3 ? "bg-primary-color" : "bg-primary-color/30",
                )}
                style={{ height: `${(value / max) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-light/40">{WEEK_DAYS[index]}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Top performing jobs                                                        */
/* -------------------------------------------------------------------------- */

function TopJobs() {
  const maxApplicants = Math.max(...jobPerformance.map((job) => job.applicants));

  return (
    <Card
      title="Top Performing Jobs"
      action={
        <Link
          href="/dashboard/employer/jobs"
          className="flex items-center gap-1 text-sm font-medium text-primary-color transition-colors hover:brightness-110"
        >
          Manage
          <ArrowUpRight className="size-3.5" />
        </Link>
      }
    >
      <ul className="mt-4 space-y-4">
        {jobPerformance.map(({ id, title, workplace, views, applicants }) => (
          <li key={id}>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-light">{title}</p>
                <p className="truncate text-xs text-light/50">{workplace}</p>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-light/50">
                <Eye className="size-3.5" />
                {views.toLocaleString()}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-light/10">
                <div
                  className="h-full rounded-full bg-primary-color"
                  style={{ width: `${(applicants / maxApplicants) * 100}%` }}
                />
              </div>
              <span className="shrink-0 text-xs font-medium text-light/70">
                {applicants} applicants
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

const EmployerDashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Employer Dashboard"
        description="Overview of your job posts, applicants and hiring progress."
        action={
          <Link
            href="/dashboard/employer/jobs/new"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary-color px-4 text-sm font-semibold text-white transition-[filter] hover:brightness-110 active:translate-y-px"
          >
            <SquarePlus className="size-4" />
            Post Job
          </Link>
        }
      />

      {/* stats — 1 → 2 → 4 columns */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {employerStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* main content — stacks on mobile, Recent Applications full-width, then a 2-col row */}
      <RecentApplications />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <WeeklyApplications />
        <TopJobs />
      </div>
    </div>
  );
};

export default EmployerDashboard;
