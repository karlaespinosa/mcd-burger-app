"use client";

import { useRef, type ReactNode } from "react";

interface ConfirmDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

export const Dialog = ({
  trigger,
  title,
  description,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  onConfirm,
}: ConfirmDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleConfirm = () => {
    onConfirm();
    closeDialog();
  };

  return (
    <>
      <span onClick={openDialog}>{trigger}</span>

      <dialog
        ref={dialogRef}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className="
          fixed top-1/2 left-1/2 m-0
          w-[calc(100%-2rem)] max-w-md
          -translate-x-1/2 -translate-y-1/2
          overflow-hidden rounded-2xl
          border border-neutral-700
          bg-neutral-900 p-0 text-white
          shadow-2xl
          backdrop:bg-black/75
          backdrop:backdrop-blur-sm
        "
      >
        <div className="p-6">
          <h2
            id="confirm-dialog-title"
            className="text-lg font-bold text-white"
          >
            {title}
          </h2>

          <p
            id="confirm-dialog-description"
            className="mt-2 text-sm leading-6 text-neutral-400"
          >
            {description}
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-neutral-800 bg-neutral-950/50 px-6 py-4">
          <button
            type="button"
            onClick={closeDialog}
            className="
              cursor-pointer rounded-lg
              border border-neutral-700
              px-4 py-2 text-sm font-semibold
              text-neutral-200
              transition
              hover:border-neutral-500
              hover:bg-neutral-800
            "
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="
              cursor-pointer rounded-lg
              bg-lime-400 px-4 py-2
              text-sm font-bold text-black
              transition
              hover:bg-lime-300
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-lime-400
            "
          >
            {confirmLabel}
          </button>
        </div>
      </dialog>
    </>
  );
};
