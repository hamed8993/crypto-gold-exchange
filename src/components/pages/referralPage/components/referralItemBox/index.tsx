import clsx from "clsx";
import { ReactNode } from "react";

interface ReferralItemBoxProps {
  title: string;
  value: string;
  icon?: ReactNode;
  valueQuote?: string;
  valueClassName?: string;
}

function ReferralItemBox({
  title,
  value,
  icon,
  valueQuote,
  valueClassName,
}: ReferralItemBoxProps) {
  return (
    <div className="flex w-full items-start justify-start gap-1">
      <p className="text-accentText text-justify text-sm">{`${title}`}:</p>
      <p
        dir="ltr"
        className={clsx(
          "font-english text-mainText text-justify text-sm",
          valueClassName,
        )}
      >
        {value}
      </p>
      <p className="text-accentText text-justify text-sm">{valueQuote}</p>
      {icon}
    </div>
  );
}

export default ReferralItemBox;
