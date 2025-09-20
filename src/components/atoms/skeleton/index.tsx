import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "w-full",
  height = "h-4",
  className = "",
  rounded = "rounded-md",
}) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`relative overflow-hidden bg-gray-200 dark:bg-gray-700 ${width} ${height} ${rounded} ${className}`}
      animate={{
        backgroundPosition: ["-200% 0", "200% 0"],
      }}
      transition={{
        repeat: Infinity,
        duration: 2.5,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 100%",
        backgroundImage:
          theme === "dark"
            ? "linear-gradient(90deg, rgba(15,19,28,1) 25%, rgba(132,142,156,0.1) 50%, rgba(15,19,28,1) 75%)"
            : "linear-gradient(90deg, rgba(246,247,248,1) 25%, rgba(132,142,156,0.1) 50%, rgba(246,247,248,1) 75%)",
      }}
    />
  );
};

export default Skeleton;
