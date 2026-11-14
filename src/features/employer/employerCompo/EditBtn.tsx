"use client";

import { useEffect } from "react";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Field, FormSelect, inputClass, textareaClass } from "@/features/dashboard/form-field";
import type { NewJobFormValues } from "@/type";
import type { JobPost } from "../jobs-data";
import { CATEGORIES, EXPERIENCE_LEVELS, JOB_TYPES, WORKPLACES } from "./job-options";

/* -------------------------------------------------------------------------- */
/* Edit menu item + edit dialog                                               */
/*                                                                            */
/* Same structure as DeleteMenuItem/DeleteDialog: the menu item lives INSIDE  */
/* <DropdownMenuContent>, the dialog lives OUTSIDE <DropdownMenu> so it       */
/* survives the menu closing on click.                                        */
/*                                                                            */
/* Usage (in a row component):                                                */
/*                                                                            */
/*   const [editOpen, setEditOpen] = useState(false);                         */
/*                                                                            */
/*   <DropdownMenuContent>                                                    */
/*     <EditMenuItem onClick={() => setEditOpen(true)} />                     */
/*   </DropdownMenuContent>                                                   */
/*                                                                            */
/*   <EditDialog                                                              */
/*     open={editOpen}                                                        */
/*     onOpenChange={setEditOpen}                                             */
/*     job={job}                                                              */
/*     onSave={handleSave}                                                    */
/*   />                                                                       */
/* -------------------------------------------------------------------------- */

type EditMenuItemProps = {
  /** Opens the dialog (controlled state lives in the parent). */
  onClick: () => void;
};

/** The "Edit" row inside the 3-dot menu. */
export const EditMenuItem = ({ onClick }: EditMenuItemProps) => (
  <DropdownMenuItem onClick={onClick}>
    <Pencil /> Edit
  </DropdownMenuItem>
);

type EditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: JobPost | null;
  /** Runs with the edited job after the user saves. */
  onSave: (job: JobPost) => void;
};

export const EditDialog = ({ open, onOpenChange, job, onSave }: EditDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewJobFormValues>();

  // Pre-fill the form with the job being edited every time the dialog opens.
  useEffect(() => {
    if (open && job) {
      // Form fields only — id/status stay on the row and are not editable.
      reset({
        title: job.title,
        company: job.company,
        category: job.category,
        jobType: job.jobType,
        workplace: job.workplace,
        location: job.location,
        experienceLevel: job.experienceLevel,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        deadline: job.deadline,
        description: job.description,
        skills: job.skills,
      });
    }
  }, [open, job, reset]);

  if (!job) return null;

  const onSubmit = (values: NewJobFormValues) => {
    onSave({ ...job, ...values });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit job post</DialogTitle>
          <DialogDescription>Update “{job.title}” and save your changes.</DialogDescription>
        </DialogHeader>

        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <Field label="Job Title" error={errors.title?.message}>
            <input
              type="text"
              className={inputClass}
              {...register("title", { required: "Job title is required" })}
            />
          </Field>

          <Field label="Company" error={errors.company?.message}>
            <input
              type="text"
              className={inputClass}
              {...register("company", { required: "Company is required" })}
            />
          </Field>

          <Field label="Category" error={errors.category?.message}>
            <FormSelect {...register("category", { required: "Category is required" })}>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </FormSelect>
          </Field>

          <Field label="Job Type" error={errors.jobType?.message}>
            <FormSelect {...register("jobType", { required: "Job type is required" })}>
              {JOB_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </FormSelect>
          </Field>

          <Field label="Workplace" error={errors.workplace?.message}>
            <FormSelect {...register("workplace", { required: "Workplace is required" })}>
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
              className={inputClass}
              {...register("location", { required: "Location is required" })}
            />
          </Field>

          <Field label="Experience Level" error={errors.experienceLevel?.message}>
            <FormSelect {...register("experienceLevel", { required: "Experience level is required" })}>
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </FormSelect>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Salary Min" error={errors.salaryMin?.message}>
              <input
                type="number"
                min={0}
                className={inputClass}
                {...register("salaryMin", { required: "Min salary is required" })}
              />
            </Field>
            <Field label="Salary Max" error={errors.salaryMax?.message}>
              <input
                type="number"
                min={0}
                className={inputClass}
                {...register("salaryMax", { required: "Max salary is required" })}
              />
            </Field>
          </div>

          <Field label="Application Deadline" error={errors.deadline?.message}>
            <input
              type="date"
              className={inputClass}
              {...register("deadline", { required: "Deadline is required" })}
            />
          </Field>

          <Field label="Job Description" error={errors.description?.message} className="sm:col-span-2">
            <textarea
              rows={4}
              className={textareaClass}
              {...register("description", { required: "Description is required" })}
            />
          </Field>

          <Field label="Skills" hint="Comma separated" error={errors.skills?.message} className="sm:col-span-2">
            <input
              type="text"
              className={inputClass}
              {...register("skills", { required: "At least one skill is required" })}
            />
          </Field>

          <DialogFooter className="col-span-full">
            <DialogClose render={<Button variant="ghost" type="button" />}>Cancel</DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
