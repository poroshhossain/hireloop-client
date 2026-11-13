"use client";

import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import Card from "@/features/dashboard/Card";
import PageHeader from "@/features/dashboard/PageHeader";
import { Field, inputClass, textareaClass } from "@/features/dashboard/form-field";

/* -------------------------------------------------------------------------- */
/* Settings                                                                   */
/*                                                                            */
/* Employer account + company settings. All three sections log to console on  */
/* save — swap each onSubmit for its API call when it exists.                 */
/* -------------------------------------------------------------------------- */

type AccountValues = {
  name: string;
  email: string;
  bio: string;
};

type SecurityValues = {
  currentPassword: string;
  newPassword: string;
};

const toggleClass = cn(
  "relative h-5 w-9 shrink-0 rounded-full bg-light/15 transition-colors",
  "after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-light after:transition-transform",
  "checked:bg-primary-color checked:after:translate-x-4",
);

const SectionAction =
  "inline-flex h-9 items-center justify-center rounded-lg bg-primary-color px-4 text-sm font-semibold text-white transition-[filter] hover:brightness-110 active:translate-y-px";

const SettingsForm = () => {
  const accountForm = useForm<AccountValues>({
    defaultValues: { name: "Alex Rivera", email: "alex@nexuslab.io", bio: "" },
  });

  const securityForm = useForm<SecurityValues>({
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  /* toggles are plain uncontrolled checkboxes — read them on save */
  const handleNotifications = (event: React.FormEvent<HTMLFormElement>) => {
    const form = new FormData(event.currentTarget);
    console.log("Notification settings:", {
      newApplicants: form.get("newApplicants") === "on",
      weeklySummary: form.get("weeklySummary") === "on",
      productUpdates: form.get("productUpdates") === "on",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Manage your employer account, security and notifications."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* account */}
        <form onSubmit={accountForm.handleSubmit((data) => console.log("Account settings:", data))}>
          <Card title="Account" className="h-full">
            <div className="mt-4 grid grid-cols-1 gap-4">
              <Field label="Full Name">
                <input type="text" className={inputClass} {...accountForm.register("name")} />
              </Field>
              <Field label="Email">
                <input type="email" className={inputClass} {...accountForm.register("email")} />
              </Field>
              <Field label="Short Bio" hint="Shown on your public profile.">
                <textarea
                  rows={3}
                  placeholder="Tell candidates who you are…"
                  className={textareaClass}
                  {...accountForm.register("bio")}
                />
              </Field>
            </div>
            <div className="mt-5 flex justify-end">
              <button type="submit" className={SectionAction}>
                Save Changes
              </button>
            </div>
          </Card>
        </form>

        {/* security */}
        <form onSubmit={securityForm.handleSubmit((data) => console.log("Password change:", data))}>
          <Card title="Security" className="h-full">
            <div className="mt-4 grid grid-cols-1 gap-4">
              <Field label="Current Password">
                <input
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                  {...securityForm.register("currentPassword", { required: "Enter your current password" })}
                />
              </Field>
              <Field
                label="New Password"
                error={securityForm.formState.errors.newPassword?.message}
              >
                <input
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                  {...securityForm.register("newPassword", {
                    required: "Enter a new password",
                    minLength: { value: 8, message: "At least 8 characters" },
                  })}
                />
              </Field>
            </div>
            <div className="mt-5 flex justify-end">
              <button type="submit" className={SectionAction}>
                Update Password
              </button>
            </div>
          </Card>
        </form>
      </div>

      {/* notifications */}
      <form onSubmit={handleNotifications}>
        <Card title="Notifications">
          <ul className="mt-4 divide-y divide-border-color/10">
            {[
              { name: "newApplicants", label: "New applicants", hint: "Get an email when someone applies." },
              { name: "weeklySummary", label: "Weekly summary", hint: "Hiring metrics digest every Monday." },
              { name: "productUpdates", label: "Product updates", hint: "News about HireLoop features." },
            ].map(({ name, label, hint }) => (
              <li key={name} className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-light">{label}</p>
                  <p className="mt-0.5 text-xs text-light/45">{hint}</p>
                </div>
                <input type="checkbox" name={name} defaultChecked={name !== "productUpdates"} className={toggleClass} />
              </li>
            ))}
          </ul>
          <div className="mt-5 flex justify-end">
            <button type="submit" className={SectionAction}>
              Save Preferences
            </button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default SettingsForm;
