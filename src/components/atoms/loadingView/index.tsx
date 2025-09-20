"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
interface LoadingViewProps {
  wrapperClassName?: string;
  className?: string;
}

function LoadingView({ wrapperClassName, className }: LoadingViewProps) {
  return (
    <div
      className={clsx(
        "flex min-h-48 items-center justify-center",
        wrapperClassName,
      )}
    >
      <motion.div
        className={clsx(
          "h-8 w-8 rounded-full border-4 border-blue-500 border-t-transparent",
          className,
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default LoadingView;
