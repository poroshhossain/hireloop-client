/* -------------------------------------------------------------------------- */
/* Manage Jobs data                                                           */
/*                                                                            */
/* JobPost = the exact "Post Job" form shape (NewJobFormValues) plus the      */
/* two fields a list row needs: id and status. That's the whole model.        */
/* -------------------------------------------------------------------------- */

import type { NewJobFormValues } from "@/type";

export type JobStatus = "active" | "paused" | "draft" | "closed";

export type JobPost = NewJobFormValues & {
  id: string;
  status: JobStatus;
};



/* -------------------------------------------------------------------------- */
/* API response → JobPost[]                                                   */
/*                                                                            */
/* Your backend returns: { success, message, data: [ { _id, title, ... } ] }  */
/* — fields match the form, but the id is _id and there is no status field.   */
/* -------------------------------------------------------------------------- */

export const apiToJobPosts = (response: unknown): JobPost[] => {
  // unwrap { data: [...] } — or use the response directly when it is an array
  const data = (response as { data?: unknown })?.data ?? response;
  if (!Array.isArray(data)) return [];

  return data.map((raw) => {
    const { _id, ...fields } = (raw ?? {}) as Record<string, unknown>;
    return {
      ...fields,
      id: String(_id ?? fields.id ?? crypto.randomUUID()),
      // backend has no status yet — treat everything as active
      status: fields.status === "paused" || fields.status === "draft" || fields.status === "closed"
        ? (fields.status as JobStatus)
        : "active",
    } as JobPost;
  });
};

/** Counts per status, used by the filter chips. */
export const jobStatusCounts = (jobs: JobPost[]) => {
  const counts: Record<JobStatus | "all", number> = {
    all: jobs.length,
    active: 0,
    paused: 0,
    draft: 0,
    closed: 0,
  };
  for (const job of jobs) counts[job.status] += 1;
  return counts;
};

/* -------------------------------------------------------------------------- */
/* Display helpers (numbers / ISO dates → readable text)                      */
/* -------------------------------------------------------------------------- */

const compactNumber = (n: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

/** "120000" + "180000" → "120K – 180K /mo" */
export const formatSalaryRange = (min: string, max: string) => {
  const low = Number(min);
  const high = Number(max);
  if (!low && !high) return "—";
  if (!high || low === high) return `${compactNumber(low)} /mo`;
  return `${compactNumber(low)} – ${compactNumber(high)} /mo`;
};

/** "2026-12-15" → "Dec 15, 2026" */
export const formatDate = (iso: string) => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? iso
    : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
