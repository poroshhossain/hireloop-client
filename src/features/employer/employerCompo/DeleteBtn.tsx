"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { JobPost } from "../jobs-data";

/* -------------------------------------------------------------------------- */
/* Delete menu item + delete dialog                                           */
/*                                                                            */
/* IMPORTANT: the two parts are separate components because the menu item     */
/* lives INSIDE <DropdownMenuContent>, and the dialog must live OUTSIDE       */
/* <DropdownMenu>. If the dialog were inside, it would unmount (and die)      */
/* the moment the menu closes on click.                                       */
/*                                                                            */
/* Usage (in a row component):                                                */
/*                                                                            */
/*   const [deleteOpen, setDeleteOpen] = useState(false);                     */
/*                                                                            */
/*   <DropdownMenuContent>                                                    */
/*     <DeleteMenuItem onClick={() => setDeleteOpen(true)} />                 */
/*   </DropdownMenuContent>                                                   */
/*                                                                            */
/*   <DeleteDialog                                                            */
/*     open={deleteOpen}                                                      */
/*     onOpenChange={setDeleteOpen}                                           */
/*     job={job}                                                              */
/*     onConfirm={handleDelete}                                               */
/*   />                                                                       */
/* -------------------------------------------------------------------------- */

type DeleteMenuItemProps = {
  /** Opens the dialog (controlled state lives in the parent). */
  onClick: () => void;
};

/** The red "Delete" row inside the 3-dot menu. */
export const DeleteMenuItem = ({ onClick }: DeleteMenuItemProps) => (
  <DropdownMenuItem variant="destructive" onClick={onClick}>
    <Trash2 /> Delete
  </DropdownMenuItem>
);

type DeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: JobPost | null;
  /** Runs after the user confirms the delete. */
  onConfirm: (job: JobPost) => void;
};

/** The confirmation dialog — mount this OUTSIDE the <DropdownMenu>. */
export const DeleteDialog = ({ open, onOpenChange, job, onConfirm }: DeleteDialogProps) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent size="sm">
      <AlertDialogHeader>
        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
          <Trash2 />
        </AlertDialogMedia>
        <AlertDialogTitle>Delete this job post?</AlertDialogTitle>
        <AlertDialogDescription>
          “{job?.title ?? "This job"}” will be permanently removed. This action cannot be
          undone.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          variant="destructive"
          onClick={() => {
            if (job) onConfirm(job);
            onOpenChange(false);
          }}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
