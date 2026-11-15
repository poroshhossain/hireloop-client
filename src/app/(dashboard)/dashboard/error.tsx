"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Error boundary for every dashboard route — friendly state + retry.         */
/* -------------------------------------------------------------------------- */

const DashboardError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-red-400/10 text-red-400">
        <TriangleAlert className="size-6" />
      </span>

      <div className="max-w-sm">
        <h1 className="text-xl font-semibold text-light">Something went wrong</h1>
        <p className="mt-2 text-sm text-light/55">
          This page failed to load. Try again — if it keeps happening, check your
          connection or come back later.
        </p>
        <p className="mt-2 text-xs text-light/30">{error.message}</p>
      </div>

      <button
        type="button"
        onClick={reset}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary-color px-4 text-sm font-semibold text-white transition-[filter] hover:brightness-110"
      >
        <RefreshCw className="size-4" />
        Try again
      </button>
    </div>
  );
};

export default DashboardError;
