import { Suspense } from "react";
import ManageJobs from "@/features/employer/ManageJobs";
import { getJobsApi } from "@/lib/api/getApi";
import { apiToJobPosts, type JobPost } from "@/features/employer/jobs-data";

/* -------------------------------------------------------------------------- */
/* With cacheComponents enabled, uncached fetches (getJobsApi) must live      */
/* inside a <Suspense> boundary — the shell prerenders instantly and the      */
/* jobs stream in fresh at request time.                                      */
/* -------------------------------------------------------------------------- */

const JobsList = async () => {
  let initialJobs: JobPost[] = [];

  try {
    const response = await getJobsApi();
    initialJobs = apiToJobPosts(response);
  } catch {
    // Backend not reachable — the table falls back to the sample jobs.
  }

  return <ManageJobs initialJobs={initialJobs} />;
};

const ManageJobsPage = () => {
  return (
    <div className="p-4 sm:p-6">
      <Suspense fallback={<p className="py-10 text-center text-sm text-light/50">Loading jobs…</p>}>
        <JobsList />
      </Suspense>
    </div>
  );
};

export default ManageJobsPage;
