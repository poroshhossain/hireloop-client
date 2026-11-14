"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Field, inputClass, textareaClass, FormSelect } from "@/features/dashboard/form-field";
import { postJobApi } from "@/lib/api/getApi";
import { toast } from "@/components/ui/toast";
import { NewJobFormValues } from "@/type";

/* -------------------------------------------------------------------------- */
/* Form                                                                       */
/* -------------------------------------------------------------------------- */

import { CATEGORIES, EXPERIENCE_LEVELS, JOB_TYPES, WORKPLACES } from "./employerCompo/job-options";

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

  const router = useRouter();

  const onSubmit = async (data: NewJobFormValues) => {
    try {
      await postJobApi(data); // Call the API to post the job
    } catch {
      toast.add({
        type: "error",
        title: "Publish failed",
        description: "Could not reach the jobs API. Please try again.",
      });
      return;
    }


    toast.add({
      type: "success",
      title: "Job published",
      description: `“${data.title.trim()}” is now live and open for applications.`,
    });
    reset();
    router.push("/dashboard/employer/jobs");
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
              className={inputClass}
              {...register("title", { required: "Job title is required" })}
            />
          </Field>

          <Field label="Company" error={errors.company?.message}>
            <input
              type="text"
              placeholder="e.g. Nexus Lab"
              className={inputClass}
              {...register("company", { required: "Company is required" })}
            />
          </Field>

          <Field label="Category" error={errors.category?.message}>
            <FormSelect
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
            </FormSelect>
          </Field>

          <Field label="Job Type" error={errors.jobType?.message}>
            <FormSelect
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
            </FormSelect>
          </Field>

          <Field label="Workplace" error={errors.workplace?.message}>
            <FormSelect
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
            </FormSelect>
          </Field>

          <Field label="Location" error={errors.location?.message}>
            <input
              type="text"
              placeholder="e.g. Dhaka, Bangladesh"
              className={inputClass}
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
            <FormSelect
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
            </FormSelect>
          </Field>

          <Field label="Salary Min" error={errors.salaryMin?.message}>
            <input
              type="number"
              min={0}
              step={1000}
              placeholder="0"
              className={inputClass}
              {...register("salaryMin", {
                required: "Min salary is required",
                validate: (value) => {
                  const amount = Number(value);
                  if (Number.isNaN(amount) || amount < 0) return "Enter a valid amount";
                  if (amount > 10_000_000) return "Amount looks unrealistic";
                  return true;
                },
              })}
            />
          </Field>

          <Field label="Salary Max" error={errors.salaryMax?.message}>
            <input
              type="number"
              min={0}
              step={1000}
              placeholder="0"
              className={inputClass}
              {...register("salaryMax", {
                required: "Max salary is required",
                validate: (value, formValues) => {
                  const amount = Number(value);
                  if (Number.isNaN(amount) || amount < 0) return "Enter a valid amount";
                  if (Number(formValues.salaryMin) > amount)
                    return "Max salary must be greater than the min salary";
                  return true;
                },
              })}
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
              min={new Date().toISOString().slice(0, 10)}
              className={inputClass}
              {...register("deadline", {
                required: "Deadline is required",
                validate: (value) => {
                  const deadline = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  if (Number.isNaN(deadline.getTime())) return "Enter a valid date";
                  if (deadline < today) return "Deadline must be today or a future date";
                  return true;
                },
              })}
            />
          </Field>

          <Field label="Job Description" error={errors.description?.message}>
            <textarea
              rows={5}
              placeholder="Describe responsibilities, requirements and benefits..."
              className={textareaClass}
              {...register("description", { required: "Description is required" })}
            />
          </Field>

          <Field label="Skills" error={errors.skills?.message}>
            <input
              type="text"
              placeholder="Figma, Design System, Prototyping (comma separated)"
              className={inputClass}
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
