"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { resolveRole, roleHome } from "@/features/dashboard/nav";

/* -------------------------------------------------------------------------- */
/* /dashboard — sends each role straight to its own home page.                 */
/* Session resolves client-side (better-auth), so the redirect waits for it.  */
/* -------------------------------------------------------------------------- */

const DashboardIndexPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    router.replace(resolveRole(session?.user?.role) === "jobseeker"
      ? roleHome.jobseeker
      : resolveRole(session?.user?.role) === "employer"
        ? roleHome.employer
        : roleHome.admin);
  }, [isPending, session, router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center gap-2 text-sm text-light/50">
      <Loader2 className="size-4 animate-spin" />
      Taking you to your dashboard…
    </div>
  );
};

export default DashboardIndexPage;
