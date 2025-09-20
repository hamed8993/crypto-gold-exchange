import CopyButton from "@/components/atoms/buttonCopy";
import ApprovedTickIcon from "@/components/atoms/svg/approvedTickIcon";
import { useCounter } from "@/core/hooks/useCounter";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { GetDepositCheck } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { CgSandClock } from "react-icons/cg";
import { MdCancel } from "react-icons/md";
import { RiProhibited2Line } from "react-icons/ri";
import { VscServerProcess } from "react-icons/vsc";
import RowContainer from "../rowContainer";
import TimeProcessBar from "../timeProcessBar";

interface RowCollectionProps {
  data: GetDepositCheck["result"];
  setTimeIsOut: (arg: boolean) => void;
}

function RowCollection({
  data: depositResult,
  setTimeIsOut,
}: RowCollectionProps) {
  const criticalMinRemainTime: number = 2 * 60;

  const t = useTranslations();
  const spanRef = useRef<HTMLSpanElement>(null);

  const { getQuoteName } = useMarketsNamesData();

  const getText = () => {
    return spanRef.current?.innerText || "";
  };

  const {
    count: remainingTime,
    startCounting,
    reset,
  } = useCounter({
    start: 0,
    end: 0,
    startOnMount: false,
  });

  useEffect(() => {
    if (depositResult?.created_at) {
      const createdAtTimeSub = Number(depositResult?.created_at);

      const nowDateSub = Number(new Date().getTime());

      const expirationDateSub = Number(
        new Decimal(createdAtTimeSub).plus(1800000),
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
        return <ApprovedTickIcon />;
    }
  };

  useEffect(() => {
    setTimeIsOut(remainingTime === 1);
  }, [remainingTime]);

  return (
    <div className="flex flex-col gap-y-[14px]">
      <RowContainer
        title={t("cryptocurrency")}
        value={depositResult?.payment_currency?.toUpperCase() || "--"}
      />

      <RowContainer
        title={t("network")}
        value={depositResult?.network?.toUpperCase() || "--"}
      />

      <RowContainer
        title={t("currencyDepositAmount")}
        value={addCommaSeparator(depositResult?.equivalent || "") || "--"}
        valueClass="font-english text-sm font-bold text-mainText dark:text-mainTextDark"
      />

      <RowContainer
        title={`${t("quantity")} ${getQuoteName(depositResult?.asset || "") || ""}`}
        value={addCommaSeparator(depositResult?.amount || 0) || "--"}
        valueClass="font-english text-sm font-bold text-mainText dark:text-mainTextDark"
      />

      <RowContainer
        title={t("status")}
        valueComponent={
          <div className="flex items-center gap-x-1 rounded-xl bg-badgeBackgroundGreen px-2 py-1 text-xs font-semibold text-positive">
            {renderStatusIcon(depositResult?.status || "")}
            <span>{depositResult?.status && t(depositResult?.status)}</span>
          </div>
        }
      />

      <RowContainer
        title={t("address")}
        valueComponent={
          <div className="flex items-center gap-2">
            <CopyButton copyValue={getText()} />
            <span
              ref={spanRef}
              className="font-english text-sm font-medium text-mainText dark:text-mainTextDark"
            >
              {depositResult?.address}
            </span>
          </div>
        }
      />

      <RowContainer
        title={t("paymentRemainedTime")}
        value={formatTime(remainingTime)}
        valueClass={clsx(
          "font-english text-sm font-bold",
          remainingTime > criticalMinRemainTime
            ? "text-mainText dark:text-mainTextDark"
            : "text-negative  dark:text-negative ",
        )}
      />
      <TimeProcessBar
        remainingTime={remainingTime}
        criticalMinRemainTime={criticalMinRemainTime}
      />
    </div>
  );
}

export default RowCollection;
