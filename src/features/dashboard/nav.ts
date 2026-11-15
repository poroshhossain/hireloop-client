import {
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  Settings,
  SquarePlus,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Dashboard navigation                                                       */
/*                                                                            */
/* Single source of truth for the role-wise sidebar + topbar. Mirrors the     */
/* "HL 2.0/Sidebar" Figma spec: brand → nav → footer (CTA, user, logout).     */
/* -------------------------------------------------------------------------- */

export type Role = "jobseeker" | "employer" | "admin";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/** Everything the sidebar renders, resolved once per role. */
export type RoleSidebar = {
  /** Text under the brand logo. */
  subtitle: string;
  /** Role title shown on the user card. */
  roleLabel: string;
  items: NavItem[];
  /** Primary footer action — omitted for roles without one (admin). */
  cta?: NavItem;
};

export const ROLES = ["jobseeker", "employer", "admin"] as const;

export const roleHome: Record<Role, string> = {
  jobseeker: "/dashboard/jobseeker",
  employer: "/dashboard/employer",
  admin: "/dashboard/admin",
};

export const sidebarsByRole: Record<Role, RoleSidebar> = {
  jobseeker: {
    subtitle: "Seeker Portal",
    roleLabel: "Seeker",
    cta: { label: "Post Resume", href: "/dashboard/jobseeker/resume", icon: SquarePlus },
    items: [
      { label: "Dashboard", href: roleHome.jobseeker, icon: LayoutDashboard },
      { label: "Jobs", href: "/dashboard/jobseeker/jobs", icon: Briefcase },
      { label: "Saved Jobs", href: "/dashboard/jobseeker/saved-jobs", icon: Bookmark },
      { label: "Applications", href: "/dashboard/jobseeker/applications", icon: FileText },
      { label: "Billing", href: "/dashboard/jobseeker/billing", icon: Wallet },
      { label: "Settings", href: "/dashboard/jobseeker/settings", icon: Settings },
    ],
  },
  employer: {
    subtitle: "Recruiter Console",
    roleLabel: "Recruiter",
    cta: { label: "Post Job", href: "/dashboard/employer/jobs/new", icon: SquarePlus },
    items: [
      { label: "Dashboard", href: roleHome.employer, icon: LayoutDashboard },
      { label: "My Company", href: "/dashboard/employer/company", icon: Building2 },
      { label: "Manage Jobs", href: "/dashboard/employer/jobs", icon: Briefcase },
      { label: "Applications", href: "/dashboard/employer/applications", icon: FileText },
      { label: "Settings", href: "/dashboard/employer/settings", icon: Settings },
    ],
  },
  admin: {
    subtitle: "Admin Console",
    roleLabel: "Admin",
    items: [
      { label: "Dashboard", href: roleHome.admin, icon: LayoutDashboard },
      { label: "Users", href: "/dashboard/admin/users", icon: Users },
      { label: "Companies", href: "/dashboard/admin/companies", icon: Building2 },
      { label: "Jobs", href: "/dashboard/admin/jobs", icon: Briefcase },
      { label: "Payments", href: "/dashboard/admin/payments", icon: Wallet },
      { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
  },
};

/** Session roles may be absent or unexpected — fall back to the default. */
export const isRole = (value: unknown): value is Role =>
  typeof value === "string" && ROLES.includes(value as Role);

export const resolveRole = (value: unknown): Role => (isRole(value) ? value : "jobseeker");

/** Matches a pathname against the role's nav — deepest match wins. */
export const pageTitle = (pathname: string, role: Role): string => {
  const { items, cta } = sidebarsByRole[role];
  const matches = [...items, ...(cta ? [cta] : [])].filter(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  // Longest href = most specific match (e.g. /jobs/new over /jobs).
  const best = matches.sort((a, b) => b.href.length - a.href.length)[0];
  return best?.label ?? "Dashboard";
};
