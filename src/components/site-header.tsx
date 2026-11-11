"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "cn";
import Logo from "./sheard/Logo";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/company", label: "Company" },
  { href: "/pricing", label: "Pricing" },
];



const getStartedClasses = cn(
  "flex h-9 items-center rounded-md bg-primary-color px-4 text-sm font-semibold text-white",
  "shadow-[0_8px_24px_-8px_var(--primary)] transition-[filter] hover:brightness-110",
);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const { data: session } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-border-color/5 bg-dark-secoundary">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}

        <Logo />
        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-color/10 hover:text-primary-color",
                  active ? "text-light" : "text-light/70",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        {session?.user ? <>
          <div className="flex items-center gap-3">
            <Link href={`/dashboard/${session?.user?.role}`}>Dashboard</Link>
            <div className="flex flex-col">
              <span>{session?.user?.name.slice(0, 2).toUpperCase()}</span>
              <span className="text-[10px]">{session?.user?.role}</span>
            </div>
          </div>
        </> : <>
          <div className="hidden items-center md:flex">
            <Link
              href="/sign-in"
              className="rounded-md px-3 py-2 text-sm font-semibold text-primary-color transition-[color] hover:brightness-125"
            >
              Sign In
            </Link>
            <span aria-hidden="true" className="mx-3 h-5 w-px bg-light/10" />
            <Link href="/get-started" className={getStartedClasses}>
              Get Started
            </Link>
          </div>
        </>}


        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex size-9 items-center justify-center rounded-md text-light/70 transition-colors hover:bg-light/6 hover:text-light md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-light/10 bg-dark-secoundary md:hidden">
          <div className="mx-auto flex max-w-6xl animate-in flex-col gap-1 px-4 py-3 duration-200 fade-in slide-in-from-top-2">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-light/6 hover:text-light",
                    active ? "text-light" : "text-light/70",
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <span aria-hidden="true" className="my-2 h-px bg-light/10" />
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-semibold text-primary-color"
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              onClick={() => setOpen(false)}
              className={cn(getStartedClasses, "mt-1 justify-center")}
            >
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
