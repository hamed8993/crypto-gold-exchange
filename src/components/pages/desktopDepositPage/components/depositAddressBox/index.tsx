import TitleValue from "@/components/atoms/TitleValue";
import ClockItem from "@/components/pages/depositAddressPage/components/depositDetailsBox/components/clockItem";
import FailedAddress from "@/components/pages/depositAddressPage/components/failedAddress";
import { useCounter } from "@/core/hooks/useCounter";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useNotification } from "@/core/providers/notificationProvider";
import { GetDepositCheck } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { Fragment, useEffect } from "react";
import { CgSandClock } from "react-icons/cg";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel, MdContentCopy } from "react-icons/md";
import { RiProhibited2Line } from "react-icons/ri";
import { VscServerProcess } from "react-icons/vsc";
interface DepositAddressBoxProps {
  data: GetDepositCheck["result"];
}
function DepositAddressBox({ data: depositResult }: DepositAddressBoxProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();
  const { showSuccess } = useNotification();

  const handleCopy = (copyValue: string) => {
    navigator.clipboard.writeText(copyValue);
    showSuccess(t("successfullyCopied"));
  };

  const { count, startCounting, reset } = useCounter({
    start: 0,
    end: 0,
    startOnMount: false,
  });

  useEffect(() => {
    if (depositResult?.created_at) {
      const createdAtTimeSub = Number(depositResult?.created_at);

      const nowDateSub = Number(new Date().getTime());

      const expirationDateSub = Number(
        new Decimal(createdAtTimeSub).plus(1800000), //30*60*1000
      );

      const remainingTimeCountDownSub = Number(
        new Decimal(expirationDateSub).minus(nowDateSub).div(1000).toFixed(0),
      );

      const remainingTimeResult =
        remainingTimeCountDownSub > 0 ? remainingTimeCountDownSub : 0;

      reset(remainingTimeResult);
      startCounting(remainingTimeResult);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositResult?.created_at]);

  const formatTime = (seconds: number) => {
    if (seconds > 0) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");

      return `${formattedMinutes}:${formattedSeconds}`;
    } else {
      return "00:00";
    }
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <CgSandClock className="h-4 w-4 text-mainBrand" />;
      case "processing":
        return <VscServerProcess className="h-4 w-4 text-mainBrand" />;
      case "rejected":
        return <RiProhibited2Line className="h-4 w-4 text-negative" />;
      case "canceled":
        return <MdCancel className="h-4 w-4 text-negative" />;
      case "completed":
        return <FaCheckCircle className="h-4 w-4 text-positive" />;
    }
  };

  const isTimeFinished = count === 0 && depositResult?.status === "pending";

  return (
    <div className="w-full p-3">
      {isTimeFinished ? (
        <FailedAddress />
      ) : (
        <Fragment>
          <TitleValue
            title={t("coinName")}
            value={depositResult?.payment_currency?.toUpperCase() || "--"}
          />
          <TitleValue
            title={t("network")}
            value={depositResult?.network?.toUpperCase() || "--"}
          />
          <TitleValue
            title={t("depositAmount")}
            value={
              <div className="flex items-center justify-start gap-1">
                <MdContentCopy
                  onClick={() => {
                    handleCopy(deleteCommas(depositResult?.equivalent));
                  }}
                  className="mr-1 h-5 w-5 text-mainBrandAlternative"
                />
                <p className="mx-1 font-english text-xs text-accentText dark:text-accentTextDark">
                  {depositResult?.payment_currency?.toUpperCase()}
                </p>
                <p className="font-english text-sm text-mainText dark:text-mainTextDark">
                  {addCommaSeparator(depositResult?.equivalent || "") || "--"}
                </p>
              </div>
            }
          />
          <TitleValue
            title={t("address")}
            value={
              <div className="flex max-w-full items-center justify-start gap-1">
                <MdContentCopy
                  onClick={() => {
                    handleCopy(depositResult?.address || "");
                  }}
                  className="min-h-5 min-w-5 text-mainBrandAlternative"
                />
                <p
                  dir="ltr"
                  className="flex-1 break-all font-english text-sm text-mainText dark:text-mainTextDark"
                >
                  {depositResult?.address}
                </p>
              </div>
            }
          />
          <TitleValue
            title={`${t("quantity")} ${getQuoteName(depositResult?.asset || "")}`}
            valueClassName="font-english"
            value={addCommaSeparator(depositResult?.amount || 0) || "--"}
          />
          <TitleValue
            title={t("status")}
            value={
              <div className="flex max-w-full items-center justify-start gap-1">
                {renderStatusIcon(depositResult?.status || "")}
                <p className="text-sm text-mainText dark:text-mainTextDark">
                  {depositResult?.status && t(depositResult.status)}
                </p>
              </div>
            }
          />
          <ClockItem time={formatTime(count)} remainingTime={count} />
        </Fragment>
      )}
    </div>
  );
}

export default DepositAddressBox;
