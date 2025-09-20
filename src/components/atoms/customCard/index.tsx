import clsx from "clsx";
import { ReactNode } from "react";

interface CustomCardProps {
  children: ReactNode;
  className?: string;
}

function CustomCard({ children, className }: CustomCardProps) {
  return (
    <div
      className={clsx(
        className,
        "mb-1 mt-3 flex h-fit w-full flex-col rounded-lg bg-surface p-5 dark:bg-surfaceDark",
      )}
    >
      {children}
    </div>
  );
}

export default CustomCard;
