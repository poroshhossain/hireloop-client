"use client"

import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/* -------------------------------------------------------------------------- */
/* Pagination                                                                 */
/*                                                                            */
/* shadcn-style pagination parts. PaginationLink is a <button> (not an <a>)   */
/* so it works for in-page pagination (slice a list) without navigation.      */
/* -------------------------------------------------------------------------- */

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="pagination"
      aria-label="Pagination"
      className={cn("flex w-full items-center justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li data-slot="pagination-item" className={cn("shrink-0", className)} {...props} />
  )
}

const paginationLinkVariants = cva(
  "group/pagination-link inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg px-2 text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-border bg-background hover:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
        active: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function PaginationLink({
  className,
  isActive,
  variant,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof paginationLinkVariants> & { isActive?: boolean }) {
  return (
    <button
      type="button"
      data-slot="pagination-link"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        paginationLinkVariants({
          variant: variant ?? (isActive ? "active" : "default"),
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      data-slot="pagination-previous"
      aria-label="Go to previous page"
      variant="ghost"
      className={cn("pr-2", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:inline">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      data-slot="pagination-next"
      aria-label="Go to next page"
      variant="ghost"
      className={cn("pl-2", className)}
      {...props}
    >
      <span className="hidden sm:inline">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="pagination-ellipsis"
      aria-hidden="true"
      className={cn("flex size-8 items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
