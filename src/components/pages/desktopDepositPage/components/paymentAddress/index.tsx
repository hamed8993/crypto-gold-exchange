import LoadingView from "@/components/atoms/loadingView";
import FailedAddress from "@/components/pages/depositAddressPage/components/failedAddress";
import { useAuth } from "@/core/providers/authProvider";
import { useGetDepositCheck } from "@/core/services/hooks";
import { useState } from "react";
import DecorativeDivider from "./components/decorativeDivider";
import HeadTitle from "./components/headTitle";
import QrCodeHead from "./components/qrCodeHead";
import QrCodeSection from "./components/qrCodeSection";
import RowCollection from "./components/rowCollection";

interface PaymentAddressProps {
  deposit_id: string;
}

function PaymentAddress({ deposit_id }: PaymentAddressProps) {
  const { isLoggedIn } = useAuth();
  const [isTimeFinished, setIsTimeFinished] = useState(false);
  const { data, isPending } = useGetDepositCheck(
    { deposit_id },
    { enabled: isLoggedIn },
  );

  const depositResult = data?.result;

  return (
    <div className="flex w-full! flex-col gap-y-5 overflow-hidden rounded-[36px] bg-constantLight px-9 py-12 xl:col-span-6 dark:bg-surfaceDark">
      {isPending ? (
        <LoadingView />
      ) : (
        <div className="relative z-10">
          {isTimeFinished ? (
            <>
              <DecorativeDivider />
              <FailedAddress />
              <DecorativeDivider />
            </>
          ) : (
            <>
              <HeadTitle />

              <DecorativeDivider />

              <QrCodeHead
                coin={depositResult?.payment_currency}
                quantity={depositResult?.amount}
                amount={depositResult?.equivalent}
                quote={depositResult?.asset}
              />
              <QrCodeSection qrTextAddress={depositResult?.address} />

              <DecorativeDivider className="my-[18px]" />

              <RowCollection
                setTimeIsOut={(arg: boolean) => {
                  setIsTimeFinished(arg);
                }}
                data={depositResult}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default PaymentAddress;
