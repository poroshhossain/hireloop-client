import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireLoop — Land the job you love",
  description:
    "Browse curated jobs, discover companies, and take the next step in your career with HireLoop.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.className} h-full`}>
      <body className="flex min-h-full flex-col bg-[#0c0c0f] text-light">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster />

      </body>
    </html>
  );
}
