"use client";

import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

export type NewJobFormValues = {
  title: string;
  company: string;
  category: string;
  jobType: string;
  workplace: string;
  location: string;
  experienceLevel: string;
  salaryMin: string;
  salaryMax: string;
  deadline: string;
  description: string;
  skills: string;
};

const CATEGORIES = ["Design", "Engineering", "Marketing", "Product", "Sales", "Other"];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const WORKPLACES = ["Remote", "On-site", "Hybrid"];

const EXPERIENCE_LEVELS = ["Entry", "Mid", "Senior", "Lead"];

/* -------------------------------------------------------------------------- */
/* Fields (same spec as "HL 2.0/Inputs" — dark card + primary focus)           */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-sm font-medium text-light/80">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

const controlClass = cn(
  "mt-1.5 h-10 w-full rounded-lg border border-border-color/30 bg-dark-secoundary/60 px-3 text-sm text-light",
  "outline-none transition-colors placeholder:text-light/35",
  "focus:border-primary-color/60 focus:ring-3 focus:ring-primary-color/20",
);

const selectClass = cn(controlClass, "cursor-pointer appearance-none bg-[position:right_0.75rem_center] bg-no-repeat");

function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      {...props}
      className={cn(selectClass, className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff88' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Form                                                                       */
/* -------------------------------------------------------------------------- */

const NewJobForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewJobFormValues>({
    defaultValues: {
      title: "",
      company: "",
      category: "",
      jobType: "",
      workplace: "",
      location: "",
      experienceLevel: "",
      salaryMin: "",
      salaryMax: "",
      deadline: "",
      description: "",
      skills: "",
    },
  });

  const onSubmit = async (data: NewJobFormValues) => {
    // getData → console
    console.log("New Job form data:", data);
    reset();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {/* ------------------------------ job details ------------------------------ */}
      <section className="rounded-xl border border-border-color/10 bg-dark-secoundary/40 p-6">
        <h2 className="text-base font-semibold text-light">Job Details</h2>
        <p className="mt-1 text-sm text-light/55">Basic information about the role you are hiring for.</p>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Job Title" error={errors.title?.message}>
            <input
              type="text"
              placeholder="e.g. Senior Product Designer"
              className={controlClass}
              {...register("title", { required: "Job title is required" })}
            />
          </Field>

          <Field label="Company" error={errors.company?.message}>
            <input
              type="text"
              placeholder="e.g. Nexus Lab"
              className={controlClass}
              {...register("company", { required: "Company is required" })}
            />
          </Field>

          <Field label="Category" error={errors.category?.message}>
            <Select
              defaultValue=""
              {...register("category", { required: "Category is required" })}
            >
              <option value="" disabled>
                Select category
              </option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Job Type" error={errors.jobType?.message}>
            <Select
              defaultValue=""
              {...register("jobType", { required: "Job type is required" })}
            >
              <option value="" disabled>
                Select job type
              </option>
              {JOB_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Workplace" error={errors.workplace?.message}>
            <Select
              defaultValue=""
              {...register("workplace", { required: "Workplace is required" })}
            >
              <option value="" disabled>
                Select workplace
              </option>
              {WORKPLACES.map((workplace) => (
                <option key={workplace} value={workplace}>
                  {workplace}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Location" error={errors.location?.message}>
            <input
              type="text"
              placeholder="e.g. Dhaka, Bangladesh"
              className={controlClass}
              {...register("location", { required: "Location is required" })}
            />
          </Field>
        </div>
      </section>

      {/* ------------------------------ compensation ----------------------------- */}
      <section className="rounded-xl border border-border-color/10 bg-dark-secoundary/40 p-6">
        <h2 className="text-base font-semibold text-light">Compensation</h2>
        <p className="mt-1 text-sm text-light/55">Monthly salary range shown to candidates.</p>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field label="Experience Level" error={errors.experienceLevel?.message}>
            <Select
              defaultValue=""
              {...register("experienceLevel", { required: "Experience level is required" })}
            >
              <option value="" disabled>
                Select level
              </option>
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Salary Min" error={errors.salaryMin?.message}>
            <input
              type="number"
              min={0}
              placeholder="0"
              className={controlClass}
              {...register("salaryMin", { required: "Min salary is required" })}
            />
          </Field>

          <Field label="Salary Max" error={errors.salaryMax?.message}>
            <input
              type="number"
              min={0}
              placeholder="0"
              className={controlClass}
              {...register("salaryMax", { required: "Max salary is required" })}
            />
          </Field>
        </div>
      </section>

      {/* ------------------------------ description ------------------------------ */}
      <section className="rounded-xl border border-border-color/10 bg-dark-secoundary/40 p-6">
        <h2 className="text-base font-semibold text-light">Description</h2>
        <p className="mt-1 text-sm text-light/55">Tell candidates what the role involves.</p>

        <div className="mt-5 grid grid-cols-1 gap-5">
          <Field label="Application Deadline" error={errors.deadline?.message}>
            <input
              type="date"
              className={cn(controlClass, "cursor-pointer")}
              {...register("deadline", { required: "Deadline is required" })}
            />
          </Field>

          <Field label="Job Description" error={errors.description?.message}>
            <textarea
              rows={5}
              placeholder="Describe responsibilities, requirements and benefits..."
              className={cn(controlClass, "h-auto resize-y py-2.5 leading-relaxed")}
              {...register("description", { required: "Description is required" })}
            />
          </Field>

          <Field label="Skills" error={errors.skills?.message}>
            <input
              type="text"
              placeholder="Figma, Design System, Prototyping (comma separated)"
              className={controlClass}
              {...register("skills", { required: "At least one skill is required" })}
            />
          </Field>
        </div>
      </section>

      {/* -------------------------------- actions -------------------------------- */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className={cn(
            "inline-flex h-10 items-center justify-center rounded-lg border border-border-color/30 px-4",
            "text-sm font-medium text-light/85 transition-colors hover:bg-dark-secoundary hover:text-light",
          )}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "inline-flex h-10 items-center justify-center rounded-lg bg-primary-color px-4",
            "text-sm font-semibold text-white transition-[filter] hover:brightness-110",
            "active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          {isSubmitting ? "Publishing..." : "Publish Job"}
        </button>
      </div>
    </form>
  );
};

export default NewJobForm;
