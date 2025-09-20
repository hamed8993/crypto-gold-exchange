import { localeType } from "@/app/[locale]/layout";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";

interface OrderDetailRowProps {
  symbol: string;
  orderId: string;
}

function OrderDetailRow({ orderId, symbol }: OrderDetailRowProps) {
  const t = useTranslations();
  const { locale } = useUrl();
  const { getMarketName } = useMarketsNamesData();

  return (
    <div className="bg-surface flex h-16 w-full items-center justify-between px-6">
      <div className="flex h-full w-[50%] flex-col items-start justify-center gap-1">
        <p className="text-accentText text-sm">{t("singleSymbol")}</p>
        <p className="text-mainText text-lg">
          {getMarketName(symbol)[locale as localeType]?.slice(0, 15)}
        </p>
      </div>
      <div className="bg-border flex h-full w-[2px]"></div>
      <div className="flex h-full w-[50%] flex-col items-end justify-center gap-1">
        <p className="text-accentText text-sm">{t("orderId")}</p>
        <p className="font-english text-mainText text-lg">
          {orderId?.slice(-12)}
        </p>
      </div>
    </div>
  );
}

export default OrderDetailRow;
