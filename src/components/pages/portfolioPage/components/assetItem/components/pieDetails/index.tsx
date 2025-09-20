import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { pieDataProps } from "../..";

interface PieDetailsProps {
  coin: string;
  pieData: Array<pieDataProps>;
}

function PieDetails({ pieData, coin }: PieDetailsProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      {pieData?.map((dataItem, index) => {
        return (
          <div
            className="flex w-full items-center justify-start gap-[2px]"
            key={index}
          >
            <div
              className={"flex h-[10px] w-[10px] rounded-full"}
              style={{ backgroundColor: dataItem.color }}
            />
            <p className="text-accentText text-[10px]">
              {t(`${dataItem.label}`)}:
            </p>
            <p className="font-english text-mainText text-[11px]">
              {addCommaSeparator(dataItem.value)}
            </p>
            <p className="text-accentText text-[10px]">{getQuoteName(coin)}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PieDetails;
