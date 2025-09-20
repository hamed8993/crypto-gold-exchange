import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { FcCandleSticks } from "react-icons/fc";
import { LuArrowLeftRight } from "react-icons/lu";
import { MdCandlestickChart } from "react-icons/md";
import IconLabelInfo from "../iconLabelInfo";

interface DailyDetailsProps {
  symbol: string;
  quote: string;
}

function DailyDetails({ symbol, quote }: DailyDetailsProps) {
  const t = useTranslations();

  const { getMarketItem } = usePriceDetail();
  const { getQuoteName } = useMarketsNamesData();
  return (
    <div className="flex h-full w-full items-center justify-between gap-8">
      <div className="flex h-full w-full flex-col items-start justify-start gap-4 py-2">
        <div className="flex h-full w-full items-center justify-start gap-4">
          <IconLabelInfo
            icon={<FcCandleSticks className="text-xl text-positive" />}
            label={t("24hChange")}
            quote={getQuoteName(quote)}
            value={addCommaSeparator(getMarketItem(symbol)?.change_price)}
          />
          <IconLabelInfo
            icon={<MdCandlestickChart className="text-xl text-positive" />}
            label={t("dailyMaximum")}
            quote={getQuoteName(quote)}
            value={addCommaSeparator(getMarketItem(symbol)?.last_price)}
          />
        </div>
        <div className="flex h-full w-full items-center justify-start gap-4">
          <IconLabelInfo
            icon={<MdCandlestickChart className="text-xl text-negative" />}
            quote={getQuoteName(quote)}
            label={t("dailyMinimum")}
            value={addCommaSeparator(getMarketItem(symbol)?.lowest_price)}
          />
          <IconLabelInfo
            quote={t("unit")}
            icon={
              <LuArrowLeftRight className="text-xl text-mainBrandAlternative" />
            }
            label={t("dailyVolume")}
            value={addCommaSeparator(getMarketItem(symbol)?.volume)}
          />
        </div>
      </div>
    </div>
  );
}

export default DailyDetails;
