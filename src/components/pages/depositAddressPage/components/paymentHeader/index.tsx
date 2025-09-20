import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface PaymentHeaderProps {
  quote?: string;
  quantity?: string;
  coin?: string;
  amount?: string;
}

function PaymentHeader({ coin, quantity, quote, amount }: PaymentHeaderProps) {
  const t = useTranslations();

  const { locale } = useUrl();

  const { getName } = useMarketsNamesData();

  const coinName =
    locale === "fa"
      ? getName(coin?.toLowerCase() || "").faName
      : getName(coin?.toLowerCase() || "").enName;

  const { getQuoteName } = useMarketsNamesData();

  return (
    <div className="flex h-fit w-full items-center justify-between rounded-lg bg-surface p-3 dark:bg-surfaceDark">
      <div className="flex h-full flex-col items-start justify-between gap-2 py-1">
        <div className="flex items-center justify-start gap-1">
          <p className="text-sm text-mainText dark:text-mainTextDark">
            {t("depositDescription1", {
              account: quote === "irt" ? t("irtiSymbol") : t("usdAccount"),
            })}
            <span
              className={clsx(
                "mx-1 font-english text-[20px]",
                quote === "irt" ? "text-positive" : "text-mainBrandAlternative",
              )}
            >
              {addCommaSeparator(quantity || "")}
            </span>
            <span>{getQuoteName(quote || "")}</span>
          </p>
        </div>
        <p className="text-sm text-mainText dark:text-mainTextDark">
          {t("depositDescription21")}
          <span className="mx-1 font-english text-[20px] text-mainBrandAlternative">
            {amount}
          </span>
          {t("depositDescription22", {
            coin: coinName || "",
          })}
        </p>
      </div>
    </div>
  );
}

export default PaymentHeader;
