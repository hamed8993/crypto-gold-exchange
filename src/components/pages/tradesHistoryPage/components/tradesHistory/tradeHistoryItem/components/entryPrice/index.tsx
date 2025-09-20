import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";

interface EntryPriseProps {
  entryPrice: string;
  quote: string;
}

function EntryPrise({ entryPrice, quote }: EntryPriseProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();
  return (
    <div className="flex min-h-6 min-w-1/2 items-center gap-1">
      <p className="text-accentText text-[10px]">{`${t("entryPrice")}: `}</p>
      <p className="font-english text-mainText text-xs">
        {addCommaSeparator(entryPrice)}
      </p>
      <p className="text-accentText mt-[2px] text-xs">{getQuoteName(quote)}</p>
    </div>
  );
}

export default EntryPrise;
