/* -------------------------------------------------------------------------- */
/* Employer — My Company data                                                 */
/*                                                                            */
/* Placeholder company profile until the company API exists.                  */
/* -------------------------------------------------------------------------- */

export type CompanyProfile = {
  name: string;
  tagline: string;
  industry: string;
  size: string;
  founded: string;
  website: string;
  location: string;
  about: string;
  openJobs: number;
  totalHires: number;
  followers: number;
};

export const companyProfile: CompanyProfile = {
  name: "Nexus Lab",
  tagline: "Building tools that make hiring feel human.",
  industry: "Software & Technology",
  size: "50–200 employees",
  founded: "2019",
  website: "nexuslab.io",
  location: "Dhaka, Bangladesh",
  about:
    "Nexus Lab is a fast-growing product studio focused on recruitment software. We help companies of every size find, evaluate and hire great people — with tools designed around fairness, speed and a deeply human experience.",
  openJobs: 24,
  totalHires: 138,
  followers: 4320,
};

/** Key facts rendered in the info grid — one line each. */
export const companyFacts = (profile: CompanyProfile) => [
  { label: "Industry", value: profile.industry },
  { label: "Company Size", value: profile.size },
  { label: "Founded", value: profile.founded },
  { label: "Website", value: profile.website },
  { label: "Headquarters", value: profile.location },
];
