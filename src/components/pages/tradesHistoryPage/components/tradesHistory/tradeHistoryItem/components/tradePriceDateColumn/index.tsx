import { SubPositionsItem } from "@/components/pages/openPositionsPage/components/editPosition";
import { useTranslations } from "next-intl";
import EntryPrise from "../entryPrice";
import ExitPrice from "../exitPrice";

interface TradePriceDateColumnProps {
  entryPrice: string;
  quote: string;
  subPositions: SubPositionsItem[];
}

function TradePriceDateColumn({
  entryPrice,
  quote,
  subPositions,
}: TradePriceDateColumnProps) {
  const t = useTranslations();

  return (
    <div className="flex h-full w-full min-w-1/2 flex-col items-start">
      <EntryPrise entryPrice={entryPrice} quote={quote} />
      <ExitPrice quote={quote} subPositions={subPositions} />

      <p className="text-accentText text-[10px]">{`${t("createdAt2")}:`}</p>
    </div>
  );
}

export default TradePriceDateColumn;
