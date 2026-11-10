import Image from "next/image"
import Link from "next/link"


function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient
          id="hireloop-mark"
          x1="3"
          y1="12"
          x2="21"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5C53FE" />
          <stop offset="1" stopColor="#5C53FE" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <g
        stroke="url(#hireloop-mark)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 21H3v-5" />
      </g>
    </svg>
  );
}

const Logo = () => {
    return (
            <Link
          href="/"
          className="group flex items-center gap-1 select-none"
        >
          <span className="relative text-lg font-extrabold tracking-tight text-primary-color">
            hire
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-0 h-3px w-full rounded-full bg-primary-color"
            />
          </span>
          <LogoMark className="size-6 transition-transform duration-500 group-hover:rotate-180" />
          <span className="text-lg font-extrabold tracking-tight text-light">
            loop
          </span>
        </Link>
    )
}
export default Logo