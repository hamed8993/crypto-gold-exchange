import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

interface LastPriceComponentProps {
  quote?: string;
  symbol: string;
}

const AnimationComponent = dynamic(
  () => import("../../AnimationComponent").then((module) => module.default),
  { ssr: false },
);

function LastPriceComponent({ quote, symbol }: LastPriceComponentProps) {
  const t = useTranslations();

  const { firstBidAsk } = useFirstBidAsk();

  return (
    <div className="bg-surface mt-2 flex w-[97%] items-center justify-start gap-2 p-4 px-3">
      <div className="max-h-10 max-w-10">
        <AnimationComponent />
      </div>

      <p className="text-mainText text-sm">{t("assetPrice")}:</p>
      <p className="font-english text-mainText text-sm">
        {addCommaSeparator(firstBidAsk?.[symbol]?.fshort || "0")}
      </p>
      <p className="text-mainText text-sm">
        {quote === "irt" ? t("irtSymbol") : t("tetherSymbol")}
      </p>
    </div>
  );
}

export default LastPriceComponent;
