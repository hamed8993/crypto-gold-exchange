import { localeType } from "@/app/[locale]/layout";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";

interface OrderTitleProps {
  symbol: string;
  base: string;
  quote: string;
  totalSize: string;
}

function OrderTitle({ base, quote, symbol, totalSize }: OrderTitleProps) {
  const { locale } = useUrl();
  const t = useTranslations();
  const { getMarketName } = useMarketsNamesData();

  return (
    <div className="flex w-full items-center justify-start gap-2 pe-2">
      <p className="mt-1 text-sm text-mainText dark:text-mainTextDark">
        {getMarketName(symbol)[locale as localeType]}
      </p>

      <p className="mt-1 text-sm text-mainText dark:text-mainTextDark">
        {totalSize}
      </p>
      <p className="mt-1 text-sm text-mainText dark:text-mainTextDark">
        {t("unit")}
      </p>
      <p className="mt-1 text-xs text-accentText dark:text-accentTextDark">
        {`${base?.toUpperCase()}/${quote?.toUpperCase()}`}
      </p>
    </div>
  );
}

export default OrderTitle;
