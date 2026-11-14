import { NewJobFormValues } from "@/type";

// BACKEND_URL is server-only (.env). Client components need a NEXT_PUBLIC_ var,
// so fall back: NEXT_PUBLIC_API_URL → BACKEND_URL → localhost.
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.BACKEND_URL ?? "http://localhost:5000";

const jobsUrl = `${API_BASE}/api/v1/jobs`;

export const postJobApi = async (data: NewJobFormValues) => {
  const response = await fetch(jobsUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to publish job (HTTP ${response.status})`);
  }

  return response.json();
};

export const getJobsApi = async () => {
  const response = await fetch(jobsUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // always show fresh job data
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs (HTTP ${response.status})`);
  }

  return response.json();
};

export const deleteJobApi = async (id: string) => {
  const response = await fetch(`${jobsUrl}/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(`Failed to delete job (HTTP ${response.status})`);
  }

  return response.json();
};

export const editJobApi = async (id: string, data: NewJobFormValues) => {
  const response = await fetch(`${jobsUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update job (HTTP ${response.status})`);
  }

  return response.json();
};
