import NewJobForm from "@/features/employer/NewJobForm";

const NewJobPage = () => {
  return (
    <div className="p-6">
      {/* header — mirrors the "Header Section" of the Manage Jobs screen */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-light">Create Job Post</h1>
        <p className="mt-1 text-sm text-light/55">
          Publish a new opening — it will appear on the public browse page once active.
        </p>
      </header>

      <div className="mx-auto max-w-3xl">
        <NewJobForm />
      </div>
    </div>
  );
};

export default NewJobPage;
