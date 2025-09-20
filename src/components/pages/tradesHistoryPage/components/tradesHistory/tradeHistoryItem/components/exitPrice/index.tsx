import { SubPositionsItem } from "@/components/pages/openPositionsPage/components/editPosition";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { usePnl } from "@/core/hooks/usePnl";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";

interface ExitPriceProps {
  quote: string;
  subPositions: SubPositionsItem[];
}

function ExitPrice({ quote, subPositions }: ExitPriceProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();
  const { getAverageExitPrice } = usePnl();
  return (
    <div className="flex min-h-6 items-center justify-start gap-1">
      <p className="text-accentText text-[10px]">{`${t("exitPrice")}: `}</p>
      <p className="font-english text-mainText text-xs">
        {addCommaSeparator(getAverageExitPrice(subPositions))}
      </p>
      <p className="text-accentText mt-[2px] text-xs">{getQuoteName(quote)}</p>
    </div>
  );
}

export default ExitPrice;
