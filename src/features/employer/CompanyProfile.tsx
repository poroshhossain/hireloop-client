import { BadgeCheck, Globe, Pencil, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import Card from "@/features/dashboard/Card";
import PageHeader from "@/features/dashboard/PageHeader";
import { companyFacts, companyProfile } from "./company-data";

/* -------------------------------------------------------------------------- */
/* My Company                                                                 */
/*                                                                            */
/* Read-only company profile with an Edit Profile action — the edit modal /   */
/* form is where functionality gets wired later.                              */
/* -------------------------------------------------------------------------- */

const CompanyProfileView = () => {
  const { name, tagline, about, openJobs, totalHires, followers } = companyProfile;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="My Company"
        description="How candidates see your company on the public job board."
        action={
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border-color/30 px-4 text-sm font-medium text-light/85 transition-colors hover:bg-dark-secoundary hover:text-light"
          >
            <Pencil className="size-4" />
            Edit Profile
          </button>
        }
      />

      {/* banner card */}
      <section className="overflow-hidden rounded-xl border border-border-color/10 bg-dark-secoundary/40">
        {/* gradient banner */}
        <div className="h-24 bg-gradient-to-r from-primary-color/40 via-primary-color/15 to-transparent sm:h-32" />

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-end gap-4">
            {/* logo — initials until avatar upload exists */}
            <span className="flex size-16 shrink-0 place-items-center rounded-xl border border-border-color/20 bg-dark-secoundary text-xl font-bold text-primary-color sm:size-20 sm:text-2xl">
              {name.slice(0, 2).toUpperCase()}
            </span>

            <div className="min-w-0 flex-1 pb-1">
              <h2 className="flex items-center gap-1.5 text-xl font-semibold text-light">
                {name}
                <BadgeCheck className="size-4.5 shrink-0 text-primary-color" aria-label="Verified" />
              </h2>
              <p className="mt-1 truncate text-sm text-light/55">{tagline}</p>
            </div>

            <a
              href={`https://${companyProfile.website}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-primary-color transition-colors hover:brightness-110"
            >
              <Globe className="size-4" />
              {companyProfile.website}
            </a>
          </div>

          {/* key facts — 1 → 2 → 3 → 5 columns */}
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {companyFacts(companyProfile).map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs text-light/40">{label}</dt>
                <dd className="mt-1 truncate text-sm font-medium text-light">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* about */}
        <Card title="About the Company" className="lg:col-span-3">
          <p className="mt-4 text-sm leading-relaxed text-light/70">{about}</p>
        </Card>

        {/* quick stats */}
        <Card title="Company Snapshot" className="lg:col-span-2">
          <ul className="mt-4 divide-y divide-border-color/10">
            {[
              { label: "Open Jobs", value: openJobs },
              { label: "Total Hires", value: totalHires },
              { label: "Followers", value: followers.toLocaleString() },
            ].map(({ label, value }) => (
              <li key={label} className="flex items-center justify-between py-3.5">
                <span className="flex items-center gap-2 text-sm text-light/60">
                  <Users className="size-4 text-light/35" />
                  {label}
                </span>
                <span className={cn("text-sm font-semibold text-light")}>{value}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default CompanyProfileView;
