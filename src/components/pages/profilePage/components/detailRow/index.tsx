import clsx from "clsx";
import { ReactNode } from "react";

interface DetailRowProps {
  title: string;
  value: ReactNode;
  icon?: ReactNode;
  helpIcon?: ReactNode;
  iconExtra?: ReactNode;
  hasExtraIcon?: boolean;
  className?: string;
  titleClassName?: string;
}

function DetailRow({
  icon,
  title,
  value,
  iconExtra,
  hasExtraIcon = false,
  className,
  titleClassName,
  helpIcon,
}: DetailRowProps) {
  return (
    <div
      className={clsx(
        "flex h-14 min-h-14 w-full items-center justify-between",
        className,
      )}
    >
      <div className="flex items-center justify-start gap-2">
        {icon}
        <p className={clsx("text-accentText text-sm", titleClassName)}>
          {title}
        </p>
        {helpIcon}
      </div>
      <div className="flex items-center justify-end gap-2">
        <p className="text-mainText text-sm">{value}</p>
        {hasExtraIcon ? (iconExtra ? iconExtra : icon) : null}
      </div>
    </div>
  );
}

export default DetailRow;
