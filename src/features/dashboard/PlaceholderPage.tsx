import { Construction, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* PlaceholderPage                                                            */
/*                                                                            */
/* Fills dashboard routes that exist in the sidebar but haven't been built    */
/* yet — one consistent "coming soon" state instead of a bare stub.           */
/* -------------------------------------------------------------------------- */

type PlaceholderPageProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

const PlaceholderPage = ({ icon: Icon, title, description, className }: PlaceholderPageProps) => {
  return (
    <section
      className={cn(
        "flex min-h-[50vh] flex-col items-center justify-center gap-4",
        "rounded-xl border border-dashed border-border-color/20 bg-dark-secoundary/20",
        "p-8 text-center",
        className,
      )}
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-primary-color/10 text-primary-color">
        <Icon className="size-6" />
      </span>

      <div className="max-w-sm">
        <h1 className="text-xl font-semibold text-light">{title}</h1>
        <p className="mt-2 text-sm text-light/55">{description}</p>
      </div>

      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
        <Construction className="size-3.5" />
        Coming soon
      </span>
    </section>
  );
};

export default PlaceholderPage;
