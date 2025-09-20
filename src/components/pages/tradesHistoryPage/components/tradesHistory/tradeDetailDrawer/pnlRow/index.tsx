import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React from "react";

interface PnlRowProps {
  totalPnl: string;
  quote?: string;
}

function PnlRow({ totalPnl, quote }: PnlRowProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        "flex min-h-8 w-full items-center justify-between px-2",
        Number(totalPnl) > 0 ? "bg-positive" : "bg-negative",
      )}
    >
      <p className="text-xs text-white">
        {Number(totalPnl) > 0
          ? t("profit")
          : Number(totalPnl) === 0
            ? t("pnl")
            : t("loss")}
      </p>
      <div className="flex items-center justify-start gap-1">
        <p dir="ltr" className="font-english text-xs text-white">
          {addCommaSeparator(totalPnl)}
        </p>
        <p className="font-english text-xs text-white">
          {quote?.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export default PnlRow;
