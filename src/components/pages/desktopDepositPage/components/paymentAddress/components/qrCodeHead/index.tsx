import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";

interface QrCodeHeadProps {
  quote?: string;
  quantity?: string;
  coin?: string;
  amount?: string;
}

function QrCodeHead({ coin, quantity, quote, amount }: QrCodeHeadProps) {
  const t = useTranslations();

  const { locale } = useUrl();

  const { getName } = useMarketsNamesData();

  const coinName =
    locale === "fa"
      ? getName(coin?.toLowerCase() || "").faName
      : getName(coin?.toLowerCase() || "").enName;

  const { getQuoteName } = useMarketsNamesData();

  return (
    <div className="flex flex-col gap-y-2">
      <p className="flex items-baseline gap-x-1 text-xs font-normal text-accentText dark:text-accentTextDark">
        {t("depositDescription1", {
          account: quote === "irt" ? t("irtiSymbol") : t("usdAccount"),
        })}
        <span className="font-english text-sm font-bold text-mainText dark:text-mainTextDark">
          {addCommaSeparator(quantity || "")}
        </span>
        <span className="text-sm font-bold text-mainText dark:text-mainTextDark">
          {getQuoteName(quote || "")}
        </span>
      </p>

      <p className="flex items-center gap-x-1 text-xs font-normal text-accentText dark:text-accentTextDark">
        {t("depositDescription21")}
        <p className="inline-flex items-center gap-x-1 text-xs font-bold text-mainText dark:text-mainTextDark">
          <span className="font-english text-sm font-bold">{amount}</span>
          <span className="text-sm font-bold">{coinName}</span>
        </p>
        {t("depositDescription212")}
      </p>
    </div>
  );
}
export default QrCodeHead;
