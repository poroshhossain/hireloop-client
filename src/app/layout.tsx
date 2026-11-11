
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireLoop",
  description: "Job Portal Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.className}>
      <body className="min-h-screen bg-[#0c0c0f] text-light">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
