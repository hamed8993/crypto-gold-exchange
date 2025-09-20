import { CustomQrCode } from "@/components/atoms/customQrCode";
import { useTranslations } from "next-intl";

interface QrCodeSectionProps {
  qrTextAddress?: string;
}

function QrCodeSection({ qrTextAddress }: QrCodeSectionProps) {
  const t = useTranslations();

  return (
    <div className="mt-[18px] flex flex-col items-center justify-center gap-y-[10px]">
      <div className="my-[10px] aspect-square h-[250px]">
        <CustomQrCode containerBorderRadius={16} qrText={qrTextAddress} />
      </div>
      <span className="text-xs font-normal text-mainText dark:text-mainTextDark">
        {t("scanQrCodeForDeposit")}
      </span>
    </div>
  );
}

export default QrCodeSection;
