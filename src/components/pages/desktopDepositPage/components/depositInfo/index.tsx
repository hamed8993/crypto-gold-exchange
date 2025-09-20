import { CustomQrCode } from "@/components/atoms/customQrCode";
import DepositPending from "@/components/pages/depositAddressPage/components/depositPending";
import PaymentHeader from "@/components/pages/depositAddressPage/components/paymentHeader";
import ProcessingBox from "@/components/pages/depositAddressPage/components/processingBox";
import { useAuth } from "@/core/providers/authProvider";
import { useGetDepositCheck } from "@/core/services/hooks";
import DepositAddressBox from "../depositAddressBox";
interface DepositInfoProps {
  deposit_id?: string;
}

function DepositInfo({ deposit_id }: DepositInfoProps) {
  const { isLoggedIn } = useAuth();

  const { data } = useGetDepositCheck({ deposit_id }, { enabled: isLoggedIn });
  const depositResult = data?.result;

  const isCompleted = depositResult?.status === "completed";
  const ProcessingStatus = depositResult?.status === "processing";

  return (
    <div className="w-full max-w-md xl:max-w-2xl">
      <div className="flex w-full flex-col items-center gap-3 rounded-lg bg-surface p-3 dark:bg-surfaceDark">
        <PaymentHeader
          coin={depositResult?.payment_currency}
          quantity={depositResult?.amount}
          amount={depositResult?.equivalent}
          quote={depositResult?.asset}
        />

        <div className="w-1/3">
          <CustomQrCode
            bgColor={"transparent"}
            containerBorderRadius={0}
            eyeColor={"#fff"}
            fgColor={"#fff"}
            qrText={depositResult?.address}
          />
        </div>

        {isCompleted ? <DepositPending /> : null}

        {ProcessingStatus ? (
          <ProcessingBox
            confirmations={depositResult?.confirmations}
            min_confirmation={depositResult?.min_confirmation}
          />
        ) : null}

        <DepositAddressBox data={depositResult} />
      </div>
    </div>
  );
}

export default DepositInfo;
