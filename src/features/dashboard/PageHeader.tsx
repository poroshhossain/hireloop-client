/* -------------------------------------------------------------------------- */
/* PageHeader                                                                 */
/*                                                                            */
/* Shared dashboard page header — title + description + optional actions.     */
/* Used by every dashboard page to keep spacing and hierarchy consistent.     */
/* -------------------------------------------------------------------------- */

type PageHeaderProps = {
  title: string;
  description?: string;
  /** Right-aligned slot — buttons, links, filters, etc. */
  action?: React.ReactNode;
};

const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-light">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-light/55">{description}</p>
        )}
      </div>

      {action && <div className="flex shrink-0 items-center gap-3">{action}</div>}
    </header>
  );
};

export default PageHeader;
