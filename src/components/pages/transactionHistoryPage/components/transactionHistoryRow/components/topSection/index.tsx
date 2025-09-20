/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomDateTime from "@/components/atoms/customDateTime";
import { useTransactionsHistoryContext } from "@/components/pages/transactionHistoryPage/provider";
import { ArrayElement } from "@/core/constants/constants";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { GetDepositHistory, GetWithdrawHistory } from "@/core/services/types";

interface TopSectionProps {
  data?:
    | ArrayElement<GetDepositHistory["result"]>
    | ArrayElement<GetWithdrawHistory["result"]>;
}

function TopSection({ data }: TopSectionProps) {
  const { watch } = useTransactionsHistoryContext();
  const { locale } = useUrl();
  const isDeposit: boolean = watch("activeTab") === "deposit";
  const { getName } = useMarketsNamesData();
  const coinName =
    locale === "fa"
      ? getName(data?.payment_currency || "").faName
      : getName(data?.payment_currency || "").enName;

  return (
    <div className="w-full">
      <div className="flex min-w-32 items-center justify-start gap-2 px-2">
        <div className="flex min-h-[40px] flex-col gap-1">
          <p className="text-mainText text-sm">
            {data?.payment_currency?.toUpperCase() || "--"} - {coinName}{" "}
          </p>
          <p className="text-mainText text-sm"></p>
          <div className="flex gap-1">
            {isDeposit && (
              //@ts-ignore
              <CustomDateTime timeStamp={data?.created_at || 0} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopSection;
