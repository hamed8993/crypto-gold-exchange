import WalletInfo from "@/components/atoms/walletInfo";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoChevronBack, IoWalletOutline } from "react-icons/io5";

interface HeaderProps {
  onClose: (value: boolean) => void;
}

function Header({ onClose }: HeaderProps) {
  const t = useTranslations();

  const [isDisplayWallet, setIsDisplayWallet] = useState<boolean>(false);

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div className="bg-mainBackground flex min-h-14 w-full items-center justify-between px-2">
        <IoChevronBack
          className="text-mainText h-7 w-7 rtl:rotate-180"
          onClick={() => {
            onClose(false);
          }}
        />

        <div className="flex items-center justify-start gap-2">
          <p className="text-mainText text-sm">{t("editOrderTitle")}</p>
        </div>

        <IoWalletOutline
          className="text-mainText h-7 w-7"
          onClick={() => {
            setIsDisplayWallet((prev) => !prev);
          }}
        />
      </div>

      {isDisplayWallet ? <WalletInfo /> : null}
    </div>
  );
}

export default Header;
