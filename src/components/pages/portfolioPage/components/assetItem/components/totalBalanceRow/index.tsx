import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";

interface TotalBalanceRowProps {
  total: string;
  coin: string;
}

function TotalBalanceRow({ coin, total }: TotalBalanceRowProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();
  return (
    <div className="mb-5 flex h-10 min-h-10 w-full items-center justify-between">
      <p className="text-accentText text-[18px]">{t("totalBalance")}</p>
      <div className="flex items-center justify-start gap-1">
        <p className="font-english text-mainText text-[18px]">
          {addCommaSeparator(total)}
        </p>
        <p className="text-accentText text-[18px]">{getQuoteName(coin)}</p>
      </div>
    </div>
  );
}

export default TotalBalanceRow;
