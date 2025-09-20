"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

interface CustomDrawerProps {
  children?: ReactNode;
  drawerClassName?: string;
  duration?: number;
  hasCross?: boolean;
  hasRadius?: boolean;
  height?: string;
  isOpen: boolean;
  onClose: () => void;
}

function CustomDrawer({
  children,
  drawerClassName,
  duration,
  hasCross = true,
  hasRadius = true,
  height,
  isOpen,
  onClose,
}: CustomDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div onClick={onClose}>
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 bg-backdrop/55"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: duration || 0.2 }}
          />

          <motion.div
            animate={{ y: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center"
            exit={{ y: "100%" }}
            initial={{ y: "100%" }}
            transition={{ duration: duration || 0.2, ease: "easeInOut" }}
          >
            <div
              className={clsx(
                "max-w-screen pointer-events-auto relative w-full bg-mainBackground shadow-lg dark:bg-mainBackgroundDark",
                drawerClassName,
              )}
              onClick={(e) => e.stopPropagation()}
              style={{
                height: height || "100dvh",
                borderTopLeftRadius: height && hasRadius ? "16px" : "0px",
                borderTopRightRadius: height && hasRadius ? "16px" : "0px",
              }}
            >
              {hasCross && (
                <div
                  className="flex min-h-14 w-full cursor-pointer items-center justify-end px-6"
                  onClick={onClose}
                >
                  <IoMdClose className="mt-2 h-6 w-6 text-mainText dark:text-mainTextDark" />
                </div>
              )}

              <div
                className={
                  hasCross
                    ? "h-[calc(100%-56px)] overflow-auto"
                    : "h-full overflow-auto"
                }
              >
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CustomDrawer;
