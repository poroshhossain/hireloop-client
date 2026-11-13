"use client";

import Link from "next/link";
import { MapPin, Search, SquarePlus } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Card from "@/features/dashboard/Card";
import PageHeader from "@/features/dashboard/PageHeader";
import StatusBadge from "@/features/dashboard/StatusBadge";
import { inputClass } from "@/features/dashboard/form-field";
import { jobPosts, jobStatusCounts, type JobStatus } from "./jobs-data";

/* -------------------------------------------------------------------------- */
/* Manage Jobs                                                                */
/*                                                                            */
/* Search + status filter chips + responsive job list. Row actions are UI-    */
/* only for now — wire them to the jobs API when it exists.                   */
/* -------------------------------------------------------------------------- */

type Filter = JobStatus | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "draft", label: "Draft" },
  { value: "closed", label: "Closed" },
];

const ROW_ACTION =
  "rounded-lg border border-border-color/20 px-2.5 py-1 text-xs font-medium text-light/70 transition-colors hover:border-primary-color/50 hover:bg-primary-color/10 hover:text-light";

const ManageJobs = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => jobStatusCounts(jobPosts), []);

  const visibleJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobPosts.filter(
      (job) =>
        (filter === "all" || job.status === filter) &&
        (!q || `${job.title} ${job.location} ${job.workplace}`.toLowerCase().includes(q)),
    );
  }, [query, filter]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Manage Jobs"
        description="Review, edit and update all of your job posts in one place."
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

      {/* search + status filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative min-w-0 sm:max-w-xs sm:flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-light/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jobs…"
            className={cn(inputClass, "pl-9")}
          />
        </label>

        <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {FILTERS.map(({ value, label }) => (
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
              <span className="ml-1.5 text-light/40">{counts[value]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* job list */}
      <Card title={`Job Posts (${visibleJobs.length})`}>
        {visibleJobs.length === 0 ? (
          <p className="mt-4 py-10 text-center text-sm text-light/50">
            No jobs match your search.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border-color/10">
            {visibleJobs.map((job) => (
              <li
                key={job.id}
                className="flex flex-wrap items-center gap-3 py-4 sm:flex-nowrap"
              >
                {/* title + meta */}
                <div className="min-w-0 flex-1 basis-full sm:basis-auto">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-medium text-light">
                      {job.title}
                    </p>
                    <StatusBadge status={job.status} />
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-light/50">
                    <span>{job.jobType}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {job.workplace} · {job.location}
                    </span>
                    <span>Posted {job.postedAt}</span>
                  </p>
                </div>

                {/* metrics */}
                <div className="flex gap-6 sm:gap-8">
                  <div>
                    <p className="text-sm font-semibold text-light">{job.applicants}</p>
                    <p className="text-xs text-light/40">Applicants</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-light">
                      {job.views.toLocaleString()}
                    </p>
                    <p className="text-xs text-light/40">Views</p>
                  </div>
                </div>

                {/* actions */}
                <div className="flex shrink-0 gap-2">
                  <button type="button" className={ROW_ACTION}>
                    View
                  </button>
                  <button type="button" className={ROW_ACTION}>
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default ManageJobs;
