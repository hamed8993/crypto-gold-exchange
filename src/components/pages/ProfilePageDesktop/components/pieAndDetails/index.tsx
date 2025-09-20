import CustomPieChart from "@/components/atoms/customPieChart";
import { ArrayElement } from "@/core/constants/constants";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";

type pieDataProps = {
  color: string;
  label: string;
  value: number;
};

type UserWallet = {
  coin: string;
  in_order: string;
  mainBalance: string;
  marginBalance: string;
  pendingWithdraw: string;
  pieData: Array<pieDataProps>;
  total: string;
}[];

interface PieAndDetailsProps {
  item?: ArrayElement<UserWallet>;
}

function PieAndDetails({ item }: PieAndDetailsProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();

  return (
    <div className="flex w-full items-center justify-around py-3">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        {item?.pieData?.map((dataItem, index) => {
          return (
            <div
              key={index}
              className="flex w-full items-center justify-start gap-1"
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
              <p className="text-accentText text-[10px]">
                {getQuoteName(item?.coin)}
              </p>
            </div>
          );
        })}
      </div>
      {item?.pieData && (
        <CustomPieChart
          data={item?.pieData}
          height={130}
          innerRadius={40}
          outerRadius={60}
          width={130}
        />
      )}
    </div>
  );
}

export default PieAndDetails;
