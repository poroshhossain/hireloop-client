/* -------------------------------------------------------------------------- */
/* Employer — Manage Jobs data                                                */
/*                                                                            */
/* Placeholder job posts until the jobs API exists. Shapes mirror what a      */
/* GET /jobs response would return so the swap is trivial.                    */
/* -------------------------------------------------------------------------- */

export type JobStatus = "active" | "paused" | "draft" | "closed";

export type JobPost = {
  id: string;
  title: string;
  jobType: string;
  workplace: string;
  location: string;
  postedAt: string;
  applicants: number;
  views: number;
  status: JobStatus;
};

export const jobPosts: JobPost[] = [
  {
    id: "j1",
    title: "Senior Product Designer",
    jobType: "Full-time",
    workplace: "Remote",
    location: "Worldwide",
    postedAt: "Oct 28, 2026",
    applicants: 412,
    views: 2431,
    status: "active",
  },
  {
    id: "j2",
    title: "Frontend Engineer",
    jobType: "Full-time",
    workplace: "Hybrid",
    location: "Dhaka, Bangladesh",
    postedAt: "Oct 21, 2026",
    applicants: 328,
    views: 1892,
    status: "active",
  },
  {
    id: "j3",
    title: "Dev-ops Engineer",
    jobType: "Contract",
    workplace: "On-site",
    location: "Chattogram, Bangladesh",
    postedAt: "Oct 12, 2026",
    applicants: 186,
    views: 1154,
    status: "paused",
  },
  {
    id: "j4",
    title: "Marketing Lead",
    jobType: "Full-time",
    workplace: "Remote",
    location: "Worldwide",
    postedAt: "Sep 30, 2026",
    applicants: 142,
    views: 921,
    status: "closed",
  },
  {
    id: "j5",
    title: "Sales Executive",
    jobType: "Part-time",
    workplace: "Hybrid",
    location: "Dhaka, Bangladesh",
    postedAt: "Nov 8, 2026",
    applicants: 27,
    views: 214,
    status: "draft",
  },
];

/** Counts per status, used by the filter chips. */
export const jobStatusCounts = (jobs: JobPost[]) => {
  const counts: Record<JobStatus | "all", number> = { all: jobs.length, active: 0, paused: 0, draft: 0, closed: 0 };
  for (const job of jobs) counts[job.status] += 1;
  return counts;
};
