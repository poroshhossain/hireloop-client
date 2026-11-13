/* -------------------------------------------------------------------------- */
/* Employer dashboard data                                                    */
/*                                                                            */
/* Placeholder data until the jobs/applications API exists — same console-    */
/* first approach as the New Job form. Keep shapes aligned with future API.   */
/* -------------------------------------------------------------------------- */

import type { LucideIcon } from "lucide-react";
import { Briefcase, CalendarCheck, UserCheck, Users } from "lucide-react";

export type Stat = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  delta?: string;
  trend?: "up" | "down";
  hint?: string;
};

export type ApplicationSummary = {
  id: string;
  name: string;
  role: string;
  appliedAt: string;
  /** 0–100 keyword match between candidate and job. */
  match: number;
  status: "new" | "shortlisted" | "interview" | "hired" | "rejected";
};

export type JobPerformance = {
  id: string;
  title: string;
  workplace: string;
  views: number;
  applicants: number;
};

export const employerStats: Stat[] = [
  {
    label: "Active Jobs",
    value: 24,
    icon: Briefcase,
    delta: "+3",
    trend: "up",
    hint: "vs last week",
  },
  {
    label: "Total Applicants",
    value: "1,248",
    icon: Users,
    delta: "+18%",
    trend: "up",
    hint: "vs last week",
  },
  {
    label: "Interviews",
    value: 32,
    icon: CalendarCheck,
    delta: "+5",
    trend: "up",
    hint: "scheduled this week",
  },
  {
    label: "Shortlisted",
    value: 96,
    icon: UserCheck,
    delta: "-4%",
    trend: "down",
    hint: "vs last week",
  },
];

export const recentApplications: ApplicationSummary[] = [
  { id: "a1", name: "Alex Rivera", role: "Senior Product Designer", appliedAt: "2h ago", match: 94, status: "new" },
  { id: "a2", name: "Maya Chen", role: "Frontend Engineer", appliedAt: "5h ago", match: 88, status: "shortlisted" },
  { id: "a3", name: "Daniel Osei", role: "Dev-ops Engineer", appliedAt: "1d ago", match: 81, status: "interview" },
  { id: "a4", name: "Sara Islam", role: "Marketing Lead", appliedAt: "2d ago", match: 76, status: "hired" },
  { id: "a5", name: "Tom Weber", role: "Sales Executive", appliedAt: "3d ago", match: 62, status: "rejected" },
];

export const jobPerformance: JobPerformance[] = [
  { id: "j1", title: "Senior Product Designer", workplace: "Remote", views: 2431, applicants: 412 },
  { id: "j2", title: "Frontend Engineer", workplace: "Hybrid · Dhaka", views: 1892, applicants: 328 },
  { id: "j3", title: "Dev-ops Engineer", workplace: "On-site", views: 1154, applicants: 186 },
  { id: "j4", title: "Marketing Lead", workplace: "Remote", views: 921, applicants: 142 },
];

/** Weekly application volume, Mon → Sun (used by the mini bar chart). */
export const weeklyApplications = [42, 68, 55, 90, 74, 38, 21];
