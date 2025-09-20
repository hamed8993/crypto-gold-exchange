import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface BalanceRowProps {
  value?: string;
  quote?: string;
  title?: string;
  icon?: ReactNode;
}

function BalanceRow({ title, value, quote, icon }: BalanceRowProps) {
  const t = useTranslations();
  return (
    <div className="flex w-full items-center justify-between px-3 py-2">
      <div className="flex items-center justify-start gap-2">
        <p className="text-sm text-accentText dark:text-accentTextDark">
          {title}
        </p>
        {icon}
      </div>
      <div className="flex items-center justify-start gap-1">
        <p className="font-english text-sm text-mainText dark:text-mainTextDark">
          {addCommaSeparator(value || 0)}
        </p>
        <p className="mt[2px] w-10 min-w-10 max-w-10 text-sm text-accentText dark:text-accentTextDark">
          {t(quote || "")}
        </p>
      </div>
    </div>
  );
}

export default BalanceRow;
