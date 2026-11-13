/* Shared application status type — used by the applications board and any
   application detail screens. Kept separate so data files stay import-safe. */

export type ApplicationStatus =
  | "new"
  | "shortlisted"
  | "interview"
  | "hired"
  | "rejected";
