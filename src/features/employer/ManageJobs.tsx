"use client";

import Link from "next/link";
import {
  Copy,
  EllipsisVertical,
  Eye,
  MapPin,
  Pause,
  Play,
  RotateCcw,
  Search,
  Send,
  SquarePlus,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Card from "@/features/dashboard/Card";
import PageHeader from "@/features/dashboard/PageHeader";
import StatusBadge from "@/features/dashboard/StatusBadge";
import { inputClass } from "@/features/dashboard/form-field";
import {
  formatDate,
  formatSalaryRange,
  jobStatusCounts,
  type JobPost,
  type JobStatus,
} from "./jobs-data";
import { deleteJobApi, editJobApi } from "@/lib/api/getApi";
import { toast } from "@/components/ui/toast";
import { DeleteDialog, DeleteMenuItem } from "./employerCompo/DeleteBtn";
import { EditDialog, EditMenuItem } from "./employerCompo/EditBtn";

/* -------------------------------------------------------------------------- */
/* Manage Jobs                                                                */
/*                                                                            */
/* Search + status filter chips + a table-style job list.                     */
/*                                                                            */
/* ROW ACTIONS ARE UI-ONLY. Every menu item has a TODO where you plug in      */
/* your own logic (view page, edit page, status update, duplicate, delete).   */
/* -------------------------------------------------------------------------- */

type Filter = JobStatus | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "draft", label: "Draft" },
  { value: "closed", label: "Closed" },
];

/** The one status action that fits each status (label + icon shown in menu). */
const STATUS_TOGGLE: Record<JobStatus, { label: string; icon: typeof Play }> = {
  draft: { label: "Publish", icon: Send },
  paused: { label: "Resume", icon: Play },
  active: { label: "Pause", icon: Pause },
  closed: { label: "Reopen", icon: RotateCcw },
};

/* Grid columns shared by the header row and every job row, so columns line up. */
const GRID = "grid gap-4 px-5 sm:grid-cols-[1fr_9rem_9rem_auto]";

/* How many jobs show per page. */
const PAGE_SIZE = 6;

/** Which page buttons to show: all pages, or a window with "…" on the sides. */
const getPageNumbers = (current: number, total: number): (number | "ellipsis-start" | "ellipsis-end")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [1];
  if (current > 3) pages.push("ellipsis-start");

  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }

  if (current < total - 2) pages.push("ellipsis-end");
  pages.push(total);
  return pages;
};

/* -------------------------------------------------------------------------- */
/* JobRow — one row of the table                                              */
/* -------------------------------------------------------------------------- */

const JobRow = ({
  job,
  onEdit,
  onDelete,
}: {
  job: JobPost;
  onEdit: (job: JobPost) => void;
  onDelete: (job: JobPost) => void;
}) => {
  const toggle = STATUS_TOGGLE[job.status];
  const ToggleIcon = toggle.icon;
  // Dialog states. Both dialogs are rendered OUTSIDE <DropdownMenu> (below)
  // so they survive the menu closing on click.
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <li
      className={cn(
        GRID,
        "items-center gap-y-2 py-4 max-sm:flex max-sm:flex-col max-sm:items-start",
      )}
    >
      {/* column 1 — job */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-medium text-light">{job.title}</p>
          <StatusBadge status={job.status} />
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-light/50">
          <span className="text-light/70">{job.company}</span>
          <span>{job.category}</span>
          <span>
            {job.jobType} · {job.experienceLevel}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" />
            {job.workplace} · {job.location}
          </span>
        </p>
      </div>

      {/* column 2 — salary */}
      <p className="text-sm text-light/80">{formatSalaryRange(job.salaryMin, job.salaryMax)}</p>

      {/* column 3 — deadline */}
      <p className="text-sm text-light/60">Apply by {formatDate(job.deadline)}</p>

      {/* column 4 — actions (3-dot menu, UI only) */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Actions for ${job.title}`}
            />
          }
          className="justify-self-end text-light/60 hover:text-light max-sm:justify-self-start"
        >
          <EllipsisVertical className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => { /* TODO: open job view */ }}>
            <Eye /> View
          </DropdownMenuItem>
          <EditMenuItem onClick={() => setEditOpen(true)} />

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => { /* TODO: update job.status */ }}>
            <ToggleIcon /> {toggle.label}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { /* TODO: duplicate the job */ }}>
            <Copy /> Duplicate
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DeleteMenuItem onClick={() => setDeleteOpen(true)} />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* edit dialog — OUTSIDE the menu so it doesn't unmount with it */}
      <EditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        job={job}
        onSave={onEdit}
      />

      {/* delete confirmation — OUTSIDE the menu so it doesn't unmount with it */}
      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        job={job}
        onConfirm={onDelete}
      />
    </li>
  );
};

/* -------------------------------------------------------------------------- */
/* ManageJobs — the page                                                      */
/* -------------------------------------------------------------------------- */

type ManageJobsProps = {
  /** Jobs fetched from the API. Empty when the backend is not reachable. */
  initialJobs?: JobPost[];
};

const ManageJobs = ({ initialJobs = [] }: ManageJobsProps) => {
  // Real jobs fetched from the API (page.tsx).
  const [jobs, setJobs] = useState<JobPost[]>(initialJobs);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);

  const counts = useMemo(() => jobStatusCounts(jobs), [jobs]);

  /** The rows matching the status filter + search text. */
  const visibleJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter(
      (job) =>
        (filter === "all" || job.status === filter) &&
        (!q || `${job.title} ${job.company} ${job.location} ${job.category}`.toLowerCase().includes(q)),
    );
  }, [jobs, query, filter]);

  const totalPages = Math.max(1, Math.ceil(visibleJobs.length / PAGE_SIZE));
  // e.g. a filter drops the list to 1 page while the user is on page 3 → clamp
  const currentPage = Math.min(page, totalPages);

  /** The rows shown on the current page. */
  const pagedJobs = visibleJobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  /** Update a job via the API, then refresh it in the list. */
  const editJob = async (job: JobPost) => {
    try {
      await editJobApi(job.id, job);
      setJobs((prev) => prev.map((j) => (j.id === job.id ? job : j)));
      toast.add({
        type: "success",
        title: "Job updated",
        description: `“${job.title}” was saved.`,
      });
    } catch {
      toast.add({
        type: "error",
        title: "Update failed",
        description: "Could not save your changes. Please try again.",
      });
    }
  };

  /** Delete a job via the API, then remove it from the list. */
  const deleteJob = async (job: JobPost) => {
    try {
      await deleteJobApi(job.id);
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
      toast.add({
        type: "success",
        title: "Job deleted",
        description: `“${job.title}” was removed.`,
      });
    } catch {
      toast.add({
        type: "error",
        title: "Delete failed",
        description: "Could not delete this job. Please try again.",
      });
    }
  };

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

      {/* search + status filter chips */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative min-w-0 sm:max-w-xs sm:flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-light/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1); // new search → back to the first page
            }}
            placeholder="Search jobs…"
            className={cn(inputClass, "pl-9")}
          />
        </label>

        <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setFilter(value);
                setPage(1); // new filter → back to the first page
              }}
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

      {/* table */}
      <Card title={`Job Posts (${visibleJobs.length})`}>
        {visibleJobs.length === 0 ? (
          <p className="mt-4 py-10 text-center text-sm text-light/50">
            No jobs match your search.
          </p>
        ) : (
          <div className="mt-2">
            {/* header row — desktop only */}
            <div
              className={cn(
                GRID,
                "hidden border-b border-border-color/10 pb-2 pt-4 text-[10px] font-semibold uppercase tracking-wide text-light/35 sm:grid",
              )}
            >
              <span>Job</span>
              <span>Salary</span>
              <span>Deadline</span>
              <span className="justify-self-end">Actions</span>
            </div>

            {/* rows */}
            <ul className="divide-y divide-border-color/10">
              {pagedJobs.map((job) => (
                <JobRow
                  key={job.id}
                  job={job}
                  onEdit={editJob}
                  onDelete={deleteJob}
                />
              ))}
            </ul>

            {/* pagination */}
            {totalPages > 1 && (
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border-color/10 pt-4 pb-2 max-sm:justify-center">
                <p className="text-xs text-light/40">
                  Page {currentPage} of {totalPages} · {visibleJobs.length} jobs
                </p>

                <Pagination className="w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage(currentPage - 1)}
                        disabled={currentPage <= 1}
                      />
                    </PaginationItem>

                    {getPageNumbers(currentPage, totalPages).map((pageNumber) => (
                      <PaginationItem key={pageNumber}>
                        {pageNumber === "ellipsis-start" || pageNumber === "ellipsis-end" ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            isActive={pageNumber === currentPage}
                            onClick={() => setPage(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setPage(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ManageJobs;
