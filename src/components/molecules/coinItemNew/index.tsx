import { ArrayElement } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import { GetAvailableCoins } from "@/core/services/types";
import clsx from "clsx";
import Image from "next/image";

interface CoinItemProps {
  coin: ArrayElement<GetAvailableCoins["result"]>;
  onClick: () => void;
  outerParentClass?: string;
  innerParentClass?: string;
  textsParentClass?: string;
  key: number;
  isLastItem: boolean;
}

function CoinItemNew({
  coin,
  onClick,
  outerParentClass,
  innerParentClass,
  textsParentClass,
  key,
  isLastItem,
}: CoinItemProps) {
  const { locale } = useUrl();

  return (
    <div
      className={clsx(
        "flex cursor-pointer flex-col items-center hover:bg-accentTextDark50 hover:dark:bg-accentText50",
        outerParentClass,
      )}
      onClick={onClick}
      key={key}
    >
      <div
        className={clsx(
          "flex w-full items-center justify-start gap-3 py-3",
          innerParentClass,
        )}
      >
        <Image
          alt="coin"
          height={36}
          src={`/assets/images/${coin.symbol.toLowerCase()}.webp`}
          width={36}
        />
        <div
          className={clsx("flex h-full flex-col items-start", textsParentClass)}
        >
          <p className="text-sm text-mainText dark:text-mainTextDark">
            {coin.symbol.toUpperCase()}
          </p>
          <p className="text-sm text-accentText dark:text-accentTextDark">
            {locale === "fa" ? coin.name_fa : coin.name_en}
          </p>
        </div>
      </div>
      {!isLastItem && (
        <span className="inline-block w-full border-b border-accentText50 dark:border-accentTextDark50"></span>
      )}
    </div>
  );
}

export default CoinItemNew;
