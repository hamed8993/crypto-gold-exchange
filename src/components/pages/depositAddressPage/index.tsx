/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import AlertBox from "@/components/atoms/alertBox";
import PwaPageLayout from "@/components/organisms/layout";
import { useCounter } from "@/core/hooks/useCounter";
import { useAuth } from "@/core/providers/authProvider";
import { useGetDepositCheck } from "@/core/services/hooks";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import DepositPending from "./components/depositPending";
import FailedAddress from "./components/failedAddress";
import PaymentHeader from "./components/paymentHeader";
import ProcessingBox from "./components/processingBox";
import QrAddressBox from "./components/QrAddressBox";
import { DepositAddressContextProvider } from "./provider";

function DepositAddressPageComponent() {
  const t = useTranslations();

  const { isLoggedIn } = useAuth();

  const searchParams = useSearchParams();

  const depositId = searchParams.get("depositId") || "";

  const { data } = useGetDepositCheck(
    { deposit_id: depositId },
    { enabled: isLoggedIn },
  );

  const { count, startCounting, reset } = useCounter({
    start: 0,
    end: 0,
    startOnMount: false,
  });

  const depositResult = data?.result;

  useEffect(() => {
    if (data?.result?.created_at) {
      const createdAtTimeSub = Number(data?.result?.created_at);

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
  }, [data?.result?.created_at]);

  const isCompleted = depositResult?.status === "completed";
  const ProcessingStatus = depositResult?.status === "processing";
  const isTimeValid = count === 0 && depositResult?.status === "pending";

  return (
    <PwaPageLayout hasFooter={false} title={t("deposit")} hasBackChevron>
      <div className="flex h-full w-full flex-col items-center justify-start overflow-y-auto px-3 pb-8 pt-3">
        <PaymentHeader
          amount={depositResult?.equivalent}
          coin={depositResult?.payment_currency}
          quantity={depositResult?.amount}
          quote={depositResult?.asset}
        />

        {!isCompleted && <DepositPending />}

        {ProcessingStatus && (
          <ProcessingBox
            confirmations={depositResult?.confirmations}
            min_confirmation={depositResult?.min_confirmation}
          />
        )}

        {!isTimeValid ? (
          <AlertBox
            data={[
              t("depositAlertText1"),
              t("depositAlertText2"),
              t("depositAlertText3"),
            ]}
          />
        ) : (
          <FailedAddress />
        )}

        {!isTimeValid ? (
          <QrAddressBox
            address={depositResult?.address}
            amount={depositResult?.equivalent}
            asset={depositResult?.asset}
            assetAmount={depositResult?.amount}
            coin={depositResult?.payment_currency}
            network={depositResult?.network}
            remainingTime={count}
            //@ts-ignore
            status={depositResult?.status}
            time={count}
          />
        ) : null}
      </div>
    </PwaPageLayout>
  );
}

const DepositAddressPage = () => {
  return (
    <DepositAddressContextProvider>
      <DepositAddressPageComponent />
    </DepositAddressContextProvider>
  );
};

export default DepositAddressPage;
