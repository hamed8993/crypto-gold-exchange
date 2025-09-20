import { ArrayElement } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import { GetAvailableCoins } from "@/core/services/types";
import Image from "next/image";

interface CoinItemProps {
  coin: ArrayElement<GetAvailableCoins["result"]>;
  onClick: () => void;
}

function CoinItem({ coin, onClick }: CoinItemProps) {
  const { locale } = useUrl();
  return (
    <div
      className="mt-1 flex min-h-10 cursor-pointer items-center px-2 hover:bg-accentText"
      onClick={onClick}
    >
      <div className="flex w-full items-center justify-start gap-4 border-b border-b-accentText50 py-2 dark:border-b-accentTextDark50">
        <Image
          alt="coin"
          height={35}
          src={`/assets/images/${coin.symbol.toLowerCase()}.webp`}
          width={35}
        />
        <div className="flex h-full flex-col items-start justify-around">
          <p className="text-xs text-mainText dark:text-mainTextDark">
            {coin.symbol.toUpperCase()}
          </p>
          <p className="text-xs text-accentText dark:text-accentTextDark">
            {locale === "fa" ? coin.name_fa : coin.name_en}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CoinItem;
