import WalletInfo from "@/components/atoms/walletInfo";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoChevronBack, IoWalletOutline } from "react-icons/io5";

interface HeaderProps {
  onClose: (value: boolean) => void;
}

function Header({ onClose }: HeaderProps) {
  const [isDisplayWallet, setIsDisplayWallet] = useState(false);

  const t = useTranslations();
  return (
    <div className="flex h-14 min-h-14 w-full flex-col items-center justify-start">
      <div className="bg-mainBackground flex min-h-14 w-full items-center justify-between px-2">
        <IoChevronBack
          onClick={() => {
            onClose(false);
          }}
          className="text-mainText h-7 w-7 rotate-180"
        />
        <div className="flex items-center justify-start gap-2">
          <p className="text-mainText text-sm">{t("editPosition")}</p>
        </div>
        <IoWalletOutline
          onClick={() => {
            setIsDisplayWallet((prev) => !prev);
          }}
          className="text-mainText h-7 w-7"
        />
      </div>
      {isDisplayWallet ? <WalletInfo /> : null}
    </div>
  );
}

export default Header;
