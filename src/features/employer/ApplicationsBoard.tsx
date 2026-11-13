"use client";

import { Download, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Card from "@/features/dashboard/Card";
import PageHeader from "@/features/dashboard/PageHeader";
import StatusBadge from "@/features/dashboard/StatusBadge";
import { inputClass } from "@/features/dashboard/form-field";
import { applications } from "./applications-data";
import type { ApplicationStatus } from "./applications-types";

/* -------------------------------------------------------------------------- */
/* Applications                                                               */
/*                                                                            */
/* Status tabs + search + responsive applicant cards. The status change /     */
/* resume download actions are UI-only until the API exists.                  */
/* -------------------------------------------------------------------------- */

type Filter = ApplicationStatus | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview", label: "Interview" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
];

const ROW_ACTION =
  "rounded-lg border border-border-color/20 px-2.5 py-1 text-xs font-medium text-light/70 transition-colors hover:border-primary-color/50 hover:bg-primary-color/10 hover:text-light";

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

const ApplicationsBoard = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return applications.filter(
      (app) =>
        (filter === "all" || app.status === filter) &&
        (!q || `${app.name} ${app.role}`.toLowerCase().includes(q)),
    );
  }, [query, filter]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Applications"
        description="Track every applicant and move them through the hiring pipeline."
      />

      {/* search + status tabs */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {FILTERS.map(({ value, label }) => {
            const count =
              value === "all"
                ? applications.length
                : applications.filter((app) => app.status === value).length;

            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  filter === value
                    ? "border-primary-color/60 bg-primary-color/15 text-light"
                    : "border-border-color/20 bg-light/5 text-light/60 hover:text-light",
                )}
              >
                {label}
                <span className="ml-1.5 text-light/40">{count}</span>
              </button>
            );
          })}
        </div>

        <label className="relative min-w-0 sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-light/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search applicants…"
            className={cn(inputClass, "pl-9")}
          />
        </label>
      </div>

      {/* applicant cards */}
      {visible.length === 0 ? (
        <Card title={`Applicants (${visible.length})`}>
          <p className="mt-4 py-10 text-center text-sm text-light/50">
            No applicants match this view.
          </p>
        </Card>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((app) => (
            <li
              key={app.id}
              className="flex flex-col rounded-xl border border-border-color/10 bg-dark-secoundary/40 p-5 transition-colors hover:border-primary-color/30"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 place-items-center rounded-full bg-primary-color/20 text-xs font-bold text-primary-color">
                  {initialsOf(app.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-light">{app.name}</p>
                  <p className="truncate text-xs text-light/50">{app.role}</p>
                </div>
                <StatusBadge status={app.status} className="shrink-0" />
              </div>

              {/* meta facts */}
              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border-color/10 pt-4 text-center">
                {[
                  { label: "Experience", value: app.experience },
                  { label: "Expected", value: app.expectedSalary },
                  { label: "Applied", value: app.appliedAt },
                ].map(({ label, value }) => (
                  <div key={label} className="min-w-0">
                    <dt className="text-[10px] uppercase tracking-wide text-light/35">{label}</dt>
                    <dd className="mt-1 truncate text-xs font-medium text-light/85">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* actions */}
              <div className="mt-4 flex gap-2">
                <button type="button" className={cn(ROW_ACTION, "flex flex-1 items-center justify-center gap-1.5")}>
                  <Download className="size-3.5" />
                  Resume
                </button>
                <button type="button" className={cn(ROW_ACTION, "flex-1")}>
                  View Profile
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicationsBoard;
