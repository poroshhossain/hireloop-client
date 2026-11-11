import { Building2, Check, Users } from "lucide-react";
import { Controller, type Control } from "react-hook-form";

type GetStartedFormValues = {
  name: string;
  email: string;
  password: string;
  role: "jobseeker" | "employer";
};

interface AuthRoleSelectProps {
  control: Control<GetStartedFormValues>;
}

const roles = [
  {
    value: "jobseeker",
    label: "Job Seeker",
    description: "Find roles, get AI-ranked matches and track applications.",
    icon: Users,
  },
  {
    value: "employer",
    label: "Employer",
    description: "Post jobs, source candidates and hire faster.",
    icon: Building2,
  },
] as const;

export function AuthRoleSelect({ control }: AuthRoleSelectProps) {
  return (
    <div>
      <span className="text-sm font-medium text-light/80">
        I'm joining as
      </span>

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <div className="mt-2 flex gap-3">
            {roles.map((role) => (
              <label
                key={role.value}
                htmlFor={`role-${role.value}`}
                className="group flex cursor-pointer items-center gap-3.5 rounded-xl border border-border-color/30 bg-dark-secoundary/60 p-4 transition-colors has-checked:border-primary-color/60 has-checked:bg-primary-color/15 has-focus-visible:ring-3 has-focus-visible:ring-primary-color/30 hover:border-border-color/60"
              >
                <input
                  type="radio"
                  id={`role-${role.value}`}
                  value={role.value}
                  name={field.name}
                  checked={field.value === role.value}
                  onChange={() => field.onChange(role.value)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  className="sr-only"
                  tabIndex={-1}
                />

                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-color/15 text-primary-color transition-colors group-has-checked:bg-primary-color group-has-checked:text-light">
                  <role.icon className="size-5" />
                </span>

                <span className="grid flex-1">
                  <span className="text-sm font-semibold text-light">
                    {role.label}
                  </span>
                </span>

                <Check
                  aria-hidden="true"
                  className="shrink-0 self-center text-primary-color opacity-0 transition-opacity group-has-checked:opacity-100"
                />
              </label>
            ))}
          </div>
        )}
      />
    </div>
  );
}