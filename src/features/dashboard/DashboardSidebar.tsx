"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  SquarePlus,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Logo from "@/components/sheard/Logo";

/* -------------------------------------------------------------------------- */
/* Role-wise sidebar data                                                     */
/*                                                                            */
/* Mirrors the "HL 2.0/Sidebar" Figma component — one spec for every role:    */
/* brand + subtitle → nav → footer (CTA, user card, logout).                  */
/* -------------------------------------------------------------------------- */

type Role = "jobseeker" | "employer" | "admin";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/** Everything the sidebar renders, resolved once per role. */
type RoleSidebar = {
  /** Text under the brand logo. */
  subtitle: string;
  /** Role title shown on the user card. */
  roleLabel: string;
  items: NavItem[];
  /** Primary footer action — omitted for roles without one (admin). */
  cta?: NavItem;
};

const ROLES = ["jobseeker", "employer", "admin"] as const;

const roleHome: Record<Role, string> = {
  jobseeker: "/dashboard/jobseeker",
  employer: "/dashboard/employer",
  admin: "/dashboard/admin",
};

const sidebarsByRole: Record<Role, RoleSidebar> = {
  jobseeker: {
    subtitle: "Seeker Portal",
    roleLabel: "Seeker",
    cta: { label: "Post Resume", href: "/dashboard/seeker/resume", icon: SquarePlus },
    items: [
      { label: "Dashboard", href: roleHome.jobseeker, icon: LayoutDashboard },
      { label: "Jobs", href: "/dashboard/seeker/jobs", icon: Briefcase },
      { label: "Saved Jobs", href: "/dashboard/seeker/saved-jobs", icon: Bookmark },
      { label: "Applications", href: "/dashboard/seeker/applications", icon: FileText },
      { label: "Billing", href: "/dashboard/seeker/billing", icon: Wallet },
      { label: "Settings", href: "/dashboard/seeker/settings", icon: Settings },
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
const isRole = (value: unknown): value is Role =>
  typeof value === "string" && ROLES.includes(value as Role);

const resolveRole = (value: unknown): Role => (isRole(value) ? value : "jobseeker");

/** "Alex Rivera" → "AR", used while there is no avatar image. */
const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

/* -------------------------------------------------------------------------- */
/* Sections                                                                   */
/* -------------------------------------------------------------------------- */

function SidebarBrand({ subtitle }: { subtitle: string }) {
  return (
    <SidebarHeader className="gap-0 px-3 py-4">
      <Logo />
      <span className="text-[11px] font-medium text-light/40">{subtitle}</span>
    </SidebarHeader>
  );
}

function SidebarNav({
  items,
  homeHref,
  loading,
}: {
  items: NavItem[];
  /** Shared `/dashboard` entry page highlights this role's Dashboard item. */
  homeHref: string;
  loading: boolean;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`) || (pathname === "/dashboard" && href === homeHref);

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {loading
            ? Array.from({ length: items.length }, (_, i) => <SidebarMenuSkeleton key={i} showIcon />)
            : items.map(({ label, href, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      render={<Link href={href} />}
                      isActive={active}
                      tooltip={label}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "text-light/60 hover:bg-light/5 hover:text-light",
                        "active:bg-primary-color/10 active:text-light",
                        "data-active:bg-primary-color/10 data-active:text-light",
                      )}
                    >
                      <Icon className="text-light/40 group-data-[active]/menu-button:text-primary-color" />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function SidebarCta({ cta }: { cta: NavItem }) {
  const Icon = cta.icon;
  return (
    <Link
      href={cta.href}
      className={cn(
        "flex h-9 items-center justify-center gap-2 rounded-md bg-primary-color px-4",
        "text-sm font-semibold text-white transition-[filter] hover:brightness-110",
      )}
    >
      <Icon className="size-4" />
      {cta.label}
    </Link>
  );
}

function UserCard({ name, roleLabel }: { name: string; roleLabel: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-light/5 p-2">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-color/20 text-[10px] font-bold text-primary-color">
        {initials(name)}
      </span>
      <div className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-xs font-semibold text-light">{name}</span>
        <span className="text-[10px] text-light/40">{roleLabel}</span>
      </div>
    </div>
  );
}

function SidebarLogout({ onLogout }: { onLogout: () => void }) {
  return (
    <button
      type="button"
      onClick={onLogout}
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-2 text-xs font-medium text-light/60",
        "transition-colors hover:bg-light/5 hover:text-light",
      )}
    >
      <LogOut className="size-4" />
      Logout
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

const DashboardSidebar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const role = resolveRole(session?.user?.role);
  const { subtitle, roleLabel, items, cta } = sidebarsByRole[role];

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <Sidebar className="border-border-color/10 bg-dark-secoundary text-light">
      <SidebarBrand subtitle={subtitle} />

      <SidebarContent className="px-2">
        <SidebarNav items={items} homeHref={roleHome[role]} loading={isPending && !session} />
      </SidebarContent>

      <SidebarFooter className="gap-2 px-3 pb-4">
        {cta && <SidebarCta cta={cta} />}
        {session?.user && <UserCard name={session.user.name} roleLabel={roleLabel} />}
        <SidebarLogout onLogout={handleLogout} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
