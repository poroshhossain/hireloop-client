import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import PageHeader from "@/features/dashboard/PageHeader";
import NewJobForm from "@/features/employer/NewJobForm";

const NewJobPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Create Job Post"
        description="Publish a new opening — it will appear on the public browse page once active."
        action={
          <Link
            href="/dashboard/employer/jobs"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border-color/30 px-4 text-sm font-medium text-light/85 transition-colors hover:bg-dark-secoundary hover:text-light"
          >
            <ChevronLeft className="size-4" />
            Back to jobs
          </Link>
        }
      />

      <div className="mx-auto w-full max-w-3xl">
        <NewJobForm />
      </div>
    </div>
  );
};

export default NewJobPage;
