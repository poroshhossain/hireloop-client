"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { pageTitle, resolveRole } from "./nav";

/* -------------------------------------------------------------------------- */
/* Topbar                                                                     */
/*                                                                            */
/* Sticky bar above every dashboard page: sidebar toggle, the current page    */
/* title (resolved from the route against the role's nav) and the user chip.  */
/* On mobile the sidebar is hidden, so this bar is the way to open it.        */
/* -------------------------------------------------------------------------- */

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

const DashboardTopbar = () => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const role = resolveRole(session?.user?.role);
  const title = pageTitle(pathname, role);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3",
        "border-b border-border-color/10 bg-dark/80 px-4 backdrop-blur-md sm:px-6",
      )}
    >
      <SidebarTrigger
        className="text-light/60 transition-colors hover:bg-light/5 hover:text-light"
        aria-label="Toggle sidebar"
      />

      <span aria-hidden="true" className="h-5 w-px bg-border-color/20" />

      <p className="truncate text-sm font-semibold text-light">{title}</p>

      {/* user chip — doubles as the identity on mobile where the sidebar footer is hidden */}
      {session?.user && (
        <div
          className={cn(
            "ml-auto flex min-w-0 items-center gap-2 rounded-full",
            "border border-border-color/20 bg-light/5 py-1 pl-1 pr-3",
          )}
        >
          <span className="flex size-7 shrink-0 place-items-center rounded-full bg-primary-color/20 text-[10px] font-bold text-primary-color">
            {initials(session.user.name)}
          </span>
          <span className="hidden min-w-0 truncate text-xs font-medium text-light/80 sm:block">
            {session.user.name}
          </span>
        </div>
      )}
    </header>
  );
};

export default DashboardTopbar;
