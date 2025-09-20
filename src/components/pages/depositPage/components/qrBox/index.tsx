import { useTranslations } from "next-intl";
import AlertBox from "@/components/atoms/alertBox";
import CustomButton from "@/components/atoms/customButton";
import { CustomQrCode } from "@/components/atoms/customQrCode";

interface QrBoxProps {
  isDisplayQrCode: boolean;
  address: string;
}

function QrBox({ isDisplayQrCode, address }: QrBoxProps) {
  const t = useTranslations();
  return (
    <>
      {isDisplayQrCode ? (
        <div className="mt-4 flex h-fit w-full flex-col items-center justify-start rounded-lg bg-surface p-4 dark:bg-surfaceDark">
          <div className="flex h-72 w-72 items-center justify-center rounded-xl bg-mainBackground p-6 dark:bg-mainBackgroundDark">
            <CustomQrCode
              bgColor={"#fff"}
              containerBorderRadius={10}
              eyeColor={"#000"}
              fgColor={"#000"}
              // TODO: change after api is ready
              qrText={address}
            />
          </div>
          <AlertBox data={[t("depositWithinTenMinutes")]} />
          <CustomButton className="mt-4" variant="mainBrandOutline">
            <p className="text-sm text-mainText dark:text-mainTextDark">
              {t("shareAddress")}
            </p>
          </CustomButton>
        </div>
      ) : null}
    </>
  );
}

export default QrBox;
