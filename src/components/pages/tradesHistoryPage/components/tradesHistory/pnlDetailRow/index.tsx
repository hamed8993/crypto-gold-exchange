import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface PnlDetailRowProps {
  totalUSDPnl?: number;
  totalIRTPnl?: number;
}

function PnlDetailRow({ totalIRTPnl, totalUSDPnl }: PnlDetailRowProps) {
  const t = useTranslations();

  return (
    <div className="bg-surface flex min-h-24 w-full items-center justify-around px-2">
      <div className="flex h-full w-full items-center justify-around">
        <div className="flex h-full w-[33%] flex-col items-center justify-center gap-2">
          <p className="text-accentText text-xs">{t("totalIRTPNL")}</p>
          <p
            className={clsx(
              "text-md font-english",
              Number(totalIRTPnl) > 0 ? "text-positive" : "text-negative",
            )}
            dir="ltr"
          >
            {addCommaSeparator(totalIRTPnl || 0)}
          </p>
        </div>
        <div className="bg-accentText h-[90%] w-px" />
        <div className="flex h-full w-[33%] flex-col items-center justify-center gap-2">
          <p className="text-accentText text-xs">{t("totalUSDPNL")}</p>
          <p
            className={clsx(
              "text-md font-english",
              Number(totalUSDPnl) > 0 ? "text-positive" : "text-negative",
            )}
            dir="ltr"
          >
            {addCommaSeparator(totalUSDPnl || 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PnlDetailRow;
