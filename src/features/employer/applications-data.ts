/* -------------------------------------------------------------------------- */
/* Employer — Applications data                                               */
/*                                                                            */
/* Placeholder applicants until the applications API exists.                  */
/* -------------------------------------------------------------------------- */

import type { ApplicationStatus } from "./applications-types";

export type Application = {
  id: string;
  name: string;
  role: string;
  appliedAt: string;
  experience: string;
  expectedSalary: string;
  status: ApplicationStatus;
};

export const applications: Application[] = [
  { id: "a1", name: "Alex Rivera", role: "Senior Product Designer", appliedAt: "2h ago", experience: "8 yrs", expectedSalary: "$4,500/mo", status: "new" },
  { id: "a2", name: "Maya Chen", role: "Frontend Engineer", appliedAt: "5h ago", experience: "5 yrs", expectedSalary: "$3,200/mo", status: "shortlisted" },
  { id: "a3", name: "Daniel Osei", role: "Dev-ops Engineer", appliedAt: "1d ago", experience: "6 yrs", expectedSalary: "$3,800/mo", status: "interview" },
  { id: "a4", name: "Sara Islam", role: "Marketing Lead", appliedAt: "2d ago", experience: "7 yrs", expectedSalary: "$2,900/mo", status: "hired" },
  { id: "a5", name: "Tom Weber", role: "Sales Executive", appliedAt: "3d ago", experience: "4 yrs", expectedSalary: "$1,800/mo", status: "rejected" },
  { id: "a6", name: "Priya Nair", role: "Frontend Engineer", appliedAt: "4d ago", experience: "3 yrs", expectedSalary: "$2,400/mo", status: "new" },
  { id: "a7", name: "Jonas Berg", role: "Senior Product Designer", appliedAt: "5d ago", experience: "10 yrs", expectedSalary: "$5,000/mo", status: "shortlisted" },
  { id: "a8", name: "Lina Park", role: "Dev-ops Engineer", appliedAt: "6d ago", experience: "5 yrs", expectedSalary: "$3,500/mo", status: "new" },
];
