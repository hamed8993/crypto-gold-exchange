import CustomButton from "@/components/atoms/customButton";
import CustomPinInput from "@/components/atoms/customPinInput";
import PwaPageLayout from "@/components/organisms/layout";
import { useTranslations } from "next-intl";
import DetailRow from "./detailRow";

function WithdrawConfirmation() {
  const t = useTranslations();
  return (
    <PwaPageLayout hasFooter={false} title={t("withdraw")}>
      <div className="flex h-full w-full flex-col items-center justify-between shadow-none">
        <div className="flex h-fit w-full flex-col items-start justify-start">
          <DetailRow title={t("coinName")} value="USDT" />
          <DetailRow title={t("totalValue")} value="152,999" />
          <DetailRow title={t("withdrawFee")} value="1,000" />
          <DetailRow title={t("totalQuantity")} value="152,555" />
          <DetailRow title={t("network")} value="BSC" />
          <CustomPinInput className="mt-10" label={t("smsCode")} length={6} />
          <CustomPinInput className="mt-10" label={t("tfa")} length={6} />
        </div>
        <div className="flex h-fit w-full flex-col items-center justify-start pb-2">
          <div className="flex w-full items-center justify-between">
            <CustomButton className="flex h-12 w-[49%] items-center justify-center">
              <p className="text-mainText text-sm">{t("confirm")}</p>
            </CustomButton>
            <CustomButton className="flex h-12 w-[49%] items-center justify-center">
              <p className="text-mainText text-sm">{t("cancel")}</p>
            </CustomButton>
          </div>
        </div>
      </div>
    </PwaPageLayout>
  );
}

export default WithdrawConfirmation;
