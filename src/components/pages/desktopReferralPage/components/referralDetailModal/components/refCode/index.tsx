import { useTranslations } from "next-intl";
import { IoBarcodeOutline } from "react-icons/io5";

interface RefCodeProps {
  code?: string;
}

function RefCode({ code }: RefCodeProps) {
  const t = useTranslations();
  return (
    <div className="bg-mainBackground -mt-5 flex w-[90%] items-center justify-between rounded-lg px-3 py-5">
      <div className="flex items-center justify-start gap-1">
        <IoBarcodeOutline className="text-mainBrand text-3xl" />
        <p className="text-mainText text-sm">{t("referralCode")}</p>
      </div>

      <p className="font-english text-mainText text-sm">{code}</p>
    </div>
  );
}

export default RefCode;
