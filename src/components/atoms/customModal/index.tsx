"use client";

import clsx from "clsx";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  children: React.ReactNode;
  hasCross?: boolean;
}

export default function CustomModal({
  isOpen,
  onClose,
  title,
  children,
  hasCross = true,
  className,
}: CustomModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      }
      onClick={onClose}
    >
      <div
        className={clsx(
          "relative flex max-h-[66vh] w-full max-w-md flex-col rounded-2xl bg-white p-6 shadow-lg dark:bg-zinc-900",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="mb-4 text-xl font-semibold text-mainText dark:text-mainTextDark">
            {title}
          </h2>
        )}
        {hasCross && (
          <button
            onClick={onClose}
            className="absolute end-4 top-4 text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-200"
            aria-label="Close modal"
          >
            <RxCross2 size={20} />
          </button>
        )}
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
}
