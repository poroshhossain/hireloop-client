
import Image from "next/image";
import {
  Briefcase,
  Building2,
  Star,
  Users,
} from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import { cn } from "cn";
import SearchHeroForm from "./sheard/SearchHeroForm";

const serif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});


const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

export function Hero() {


  return (
    <section className="relative overflow-hidden bg-dark">
      {/* Globe Background */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <Image
          src="/globe-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_25%] lg:object-[50%_33%]"
        />

        <div className="absolute inset-0 bg-dark/50" />

        <div className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-dark-secoundary/60 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28">

        {/* Announcement */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <span
            aria-hidden="true"
            className="h-px w-12 bg-linear-to-r from-transparent via-light/30 to-light/70 sm:w-28"
          />

          <span className="inline-flex items-center gap-2.5 rounded-full border border-border-color/30 bg-dark-secoundary/90 py-1.5 pr-4 pl-1.5 shadow-lg">
            <span className="grid size-6 place-items-center rounded-full bg-primary-color">
              <Briefcase className="size-3.5 text-light" />
            </span>

            <span className="text-sm font-bold tracking-wide text-light">
              50,000+
            </span>

            <span className="font-mono text-[11px] tracking-widest text-light/60 uppercase">
              New jobs this month
            </span>
          </span>

          <span
            aria-hidden="true"
            className="h-px w-12 bg-linear-to-l from-transparent via-light/30 to-light/70 sm:w-28"
          />
        </div>

        {/* Headline */}
        <h1
          className={cn(
            serif.className,
            "mx-auto mt-6 max-w-3xl text-center text-5xl leading-[1.05] tracking-tight text-light sm:mt-8 sm:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-700"
          )}
        >
          Find Your{" "}
          <span className="text-primary-color italic">
            Dream Job
          </span>{" "}
          Today
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-light/70 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role —
          faster, smarter, yours.
        </p>

        {/* Search Form */}
      <SearchHeroForm/>

 

        {/* Globe Spacing */}
        <div className="h-40 sm:h-56" />

        {/* Globe Overlay Text */}
        <p className="mx-auto max-w-md text-center font-mono text-xl leading-snug text-light/90 sm:text-2xl">
          Assisting over{" "}
          <span className="font-bold text-light">
            15,000 job seekers
          </span>{" "}
          find their dream positions.
        </p>

        {/* Statistics */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="group rounded-2xl border border-border-color/30 bg-dark-secoundary/85 p-5 backdrop-blur-md transition-colors hover:border-primary-color/60"
            >
              <Icon className="size-5 text-light/70 transition-colors group-hover:text-primary-color" />

              <div className="mt-10 text-3xl font-bold tracking-tight text-light sm:text-4xl">
                {value}
              </div>

              <div className="mt-1 text-xs text-light/60 sm:text-sm">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
