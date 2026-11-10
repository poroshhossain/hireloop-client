import Link from "next/link";
import type { ReactNode } from "react";
import Logo from "./sheard/Logo";
import { GlowGrid } from "./footer/glow-grid";
import { cn } from "cn";

/* ---------------------------------- data ---------------------------------- */

type FooterLink = { label: string; href: string };

const navigationLinks: FooterLink[] = [
  { label: "Job discovery", href: "/jobs" },
  { label: "Worker AI", href: "/worker-ai" },
  { label: "Companies", href: "/company" },
  { label: "Salary data", href: "/salary" },
];

const resourceLinks: FooterLink[] = [
  { label: "Help center", href: "/help-center" },
  { label: "Career library", href: "/career-library" },
  { label: "Contact", href: "/contact" },
];

const legalLinks: FooterLink[] = [
  { label: "Brand Guideline", href: "/brand-guideline" },
  { label: "Newsroom", href: "/newsroom" },
];

const socialLinks: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

/* ------------------------------ link column ------------------------------- */

function LinkColumn({
  title,
  links,
  groupLabel,
}: {
  title?: string;
  links: FooterLink[];
  groupLabel: string;
}) {
  return (
    <nav aria-label={groupLabel} className="flex flex-col gap-4">
      {title ? (
        <h3 className="text-sm font-medium text-primary-color">{title}</h3>
      ) : (
        <span aria-hidden="true" className="h-5" />
      )}
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------- social icon ------------------------------ */

function SocialLink({
  href,
  label,
  icon,
  filled,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  filled?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "grid size-9 place-items-center rounded-lg transition-[filter,border-color,background-color] hover:brightness-110",
        filled
          ? "bg-primary-color text-white shadow-[0_8px_20px_-8px_var(--primary)]"
          : "border border-white/10 bg-white/[0.04] text-white/70 hover:border-white/25 hover:text-white",
      )}
    >
      {icon}
    </a>
  );
}

/* --------------------------------- footer --------------------------------- */

const accountButtonClass =
  "inline-flex h-10 items-center justify-center rounded-lg bg-white px-4 text-sm font-semibold text-[#0b0b0e] transition hover:bg-white/85 active:translate-y-px";

const pricingButtonClass =
  "inline-flex h-10 items-center justify-center rounded-lg border border-white/15 bg-[#16161a] px-4 text-sm font-medium text-white transition hover:border-white/30 hover:bg-[#1d1d22]";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#08080b]">
      <GlowGrid />

      <div className="relative mx-auto max-w-6xl px-4 pt-64 pb-8 sm:px-6 sm:pt-72 lg:pt-[340px]">
        {/* CTA */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            Your next role is
            <br />
            already looking for you
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/55 sm:text-base">
            Build a profile in three minutes. The matches start arriving
            tomorrow morning.
          </p>
        </div>

        {/* brand / actions / link columns */}
        <div className="mt-14 grid gap-12 sm:grid-cols-12 md:gap-8 lg:mt-20">
          {/* brand */}
          <div className="sm:col-span-4 lg:col-span-3">
            <Logo />
            <p className="mt-5 max-w-[230px] text-sm leading-relaxed text-white/50">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* actions */}
          <div className="sm:col-span-4 lg:col-span-3">
            <div className="flex flex-wrap gap-2.5 sm:justify-center lg:justify-start">
              <Link href="/get-started" className={accountButtonClass}>
                Create a free account
              </Link>
              <Link href="/pricing" className={pricingButtonClass}>
                View pricing
              </Link>
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:col-span-12 lg:col-span-6 lg:grid-cols-3">
            <LinkColumn title="Navigations" links={navigationLinks} groupLabel="Navigations" />
            <LinkColumn title="Resources" links={resourceLinks} groupLabel="Resources" />
            <LinkColumn links={legalLinks} groupLabel="Legal" />
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center lg:mt-20">
          <div className="flex items-center gap-2.5">
            {socialLinks.map((social, index) => (
              <SocialLink
                key={social.label}
                href={social.href}
                label={social.label}
                icon={social.icon}
                filled={index === 1}
              />
            ))}
          </div>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/35 sm:text-sm">
            <span>Copyright 2024 — Programming Hero</span>
            <Link
              href="/terms"
              className="transition-colors hover:text-white/70"
            >
              Terms &amp; Policy
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-white/70"
            >
              Privacy Guideline
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
