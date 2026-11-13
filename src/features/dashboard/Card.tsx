import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Card                                                                       */
/*                                                                            */
/* Shared dashboard section card — title + optional action slot + content.    */
/* One shell so every page section looks identical.                           */
/* -------------------------------------------------------------------------- */

type CardProps = {
  title: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

const Card = ({ title, action, className, children }: CardProps) => {
  return (
    <section
      className={cn(
        "rounded-xl border border-border-color/10 bg-dark-secoundary/40 p-5 sm:p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-light">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
};

export default Card;
