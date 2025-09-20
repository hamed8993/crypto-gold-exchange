import clsx from "clsx";
import { ReactNode } from "react";

interface SpanBadgeProps {
  children?: string | ReactNode;
  containerClassName?: string;
}

function SpanBadge({ children, containerClassName }: SpanBadgeProps) {
  return (
    <span
      className={clsx(
        "bg-newColor_bgNeutral5 text-textSecondary rounded-md px-[10px] py-1 text-xs font-normal text-nowrap",
        containerClassName,
      )}
    >
      {children}
    </span>
  );
}

export default SpanBadge;
