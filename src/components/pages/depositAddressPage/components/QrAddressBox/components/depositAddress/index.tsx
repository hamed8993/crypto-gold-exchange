import { useNotification } from "@/core/providers/notificationProvider";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoQrCodeOutline, IoShareSocialOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import Qr from "../qr";

interface DepositAddressProps {
  address?: string;
}

function DepositAddress({ address }: DepositAddressProps) {
  const t = useTranslations();
  const { showSuccess } = useNotification();
  const [isQrDrawerOpen, setIsQrDrawerOpen] = useState(false);
  const handleCopy = (copyValue: string) => {
    navigator.clipboard.writeText(copyValue);
    showSuccess(t("successfullyCopied"));
  };
  return (
    <div className="mt-3 flex-col mb-1 flex w-full items-start justify-start px-3">
      <div className="flex w-full items-center justify-between ">
        <p className="text-xs text-accentText dark:text-accentTextDark">
          {t("address")}
        </p>
      </div>

      <div className="flex max-w-full justify-start items-start mt-3 gap-1">
        <IoShareSocialOutline className="w-5 h-5 text-mainBrandAlternative" />
        <IoQrCodeOutline
          onClick={() => {
            setIsQrDrawerOpen(true);
          }}
          className="w-5 h-5 text-mainBrandAlternative"
        />
        <MdContentCopy
          onClick={() => {
            handleCopy(address || "");
          }}
          className=" min-w-5 min-h-5 text-mainBrandAlternative"
        />
        <span
          dir="ltr"
          className="truncate font-english text-mainText dark:text-mainTextDark text-lg break-all flex-1"
        >
          {address}
        </span>
      </div>
      <Qr
        isOpen={isQrDrawerOpen}
        onClose={() => {
          setIsQrDrawerOpen(false);
        }}
        address={address}
        logo={"/assets/images/bnb.png"}
      />
    </div>
  );
}

export default DepositAddress;
