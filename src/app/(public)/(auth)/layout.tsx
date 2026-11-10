import type { ReactNode } from "react";



export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100svh-4rem)] ">
      {/* Brand Panel */}
    

      {/* Form Panel */}
      <main className="flex min-w-0 items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
}
