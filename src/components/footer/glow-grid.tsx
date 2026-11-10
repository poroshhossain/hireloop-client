/**
 * Decorative "planet horizon" artwork used behind the footer CTA.
 * Wireframe globe grid SVG + layered radial glows, site-agnostic and reusable.
 */
const RINGS = [0.22, 0.32, 0.42, 0.52, 0.62, 0.73, 0.84, 1];
const MERIDIANS = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

const fadeMask = {
  WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 97%)",
  maskImage: "linear-gradient(to bottom, black 30%, transparent 97%)",
};

export function GlowGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 h-[380px] sm:h-[460px] md:h-[540px] ${className ?? ""}`}
    >
      {/* wireframe globe grid */}
      <svg
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-0 h-full w-full"
        style={fadeMask}
      >
        <g fill="none" stroke="rgba(154,138,255,0.17)" strokeWidth="1">
          {/* meridian fan converging under the bloom */}
          {MERIDIANS.map((m) => (
            <path
              key={m}
              d={`M720 96 Q ${720 + m * 70} 400 ${720 + m * 300} 706`}
            />
          ))}
          {/* latitude rings riding down the dome */}
          {RINGS.map((s) => (
            <ellipse key={s} cx="720" cy="170" rx={830 * s} ry={456 * s} />
          ))}
        </g>
        {/* bright rim on the horizon silhouette */}
        <ellipse
          cx="720"
          cy="395"
          rx="1500"
          ry="300"
          fill="none"
          stroke="rgba(206,190,255,0.28)"
          strokeWidth="1.5"
        />
      </svg>

      {/* planet bloom — bright dome sitting just below the top edge */}
      <div className="absolute inset-x-0 top-0 h-[74%] bg-[radial-gradient(60%_58%_at_50%_4%,rgba(97,72,255,0.32),transparent_72%)]" />
      <div className="absolute inset-x-0 top-0 h-[62%] bg-[radial-gradient(34%_50%_at_50%_10%,rgba(127,94,255,0.8),rgba(90,52,238,0.32)_55%,transparent_75%)]" />
      <div className="absolute inset-x-0 top-0 h-[34%] bg-[radial-gradient(22%_30%_at_50%_8%,rgba(206,188,255,0.42),transparent_75%)]" />

      {/* dissolve the artwork into the footer background at the edges */}
      <div className="absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[#08080b]/85 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-[#08080b]/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#08080b] to-transparent" />
    </div>
  );
}
