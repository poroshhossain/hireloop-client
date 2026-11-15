import { Skeleton } from "@/components/ui/skeleton";

/* -------------------------------------------------------------------------- */
/* Loading state for every dashboard route — mirrors the common page shape    */
/* (PageHeader + stat grid + content cards) so navigation feels instant.      */
/* -------------------------------------------------------------------------- */

const DashboardLoading = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* header */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>

      {/* content cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  );
};

export default DashboardLoading;
