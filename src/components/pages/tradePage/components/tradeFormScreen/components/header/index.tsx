import { localeType } from "@/app/[locale]/layout";
import WalletInfo from "@/components/atoms/walletInfo";
import { useTradeContext } from "@/components/pages/tradePage/provider";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { useState } from "react";
import { IoChevronBack, IoWalletOutline } from "react-icons/io5";

interface HeaderProps {
  symbol: string;
  setIsSecondPage: (value: boolean) => void;
}

function Header({ symbol, setIsSecondPage }: HeaderProps) {
  const { reset } = useTradeContext();
  const { locale } = useUrl();
  const [isDisplayWallet, setIsDisplayWallet] = useState(false);

  const { getMarketName } = useMarketsNamesData();

  const name = getMarketName(symbol)[locale as localeType];

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div className="bg-mainBackground flex min-h-14 w-full items-center justify-between px-2">
        <IoWalletOutline
          onClick={() => {
            setIsDisplayWallet((prev) => !prev);
          }}
          className="text-mainText h-7 w-7"
        />
        <p className="text-mainText text-lg">{name}</p>
        <IoChevronBack
          onClick={() => {
            setIsSecondPage(false);
            reset();
          }}
          className="text-mainText h-7 w-7"
        />
      </div>
      {isDisplayWallet ? <WalletInfo /> : null}
    </div>
  );
}

export default Header;
