
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "HireLoop — Land the job you love",
  description:
    "Browse curated jobs, discover companies, and take the next step in your career with HireLoop.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
