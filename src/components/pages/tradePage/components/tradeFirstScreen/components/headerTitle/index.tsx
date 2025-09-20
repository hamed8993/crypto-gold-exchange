import { RoutesName } from "@/core/constants/routes";
import { usePnl } from "@/core/hooks/usePnl";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { IoHelpCircleOutline } from "react-icons/io5";
import MarketHelpDrawer from "../marketHelpDrawer";

interface HeaderTitleProps {
  name?: string;
  symbol: string;
  quoteAsset: string;
}

function HeaderTitle({ name, symbol, quoteAsset }: HeaderTitleProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations();
  const { locale } = useUrl();
  const { getLeverages, getPlMultiplier, getPriceStep } = usePnl();

  return (
    <div className="flex items-center justify-start gap-1">
      <Link href={`/${locale}/${RoutesName.markets}`}>
        <p className="text-mainText text-lg">{name}</p>
      </Link>

      {name && (
        <IoHelpCircleOutline
          className="text-accentText mb-3 h-5 w-5"
          onClick={() => {
            setIsOpen(true);
          }}
        />
      )}

      <MarketHelpDrawer
        isOpen={isOpen}
        leverages={getLeverages(symbol)}
        name={name}
        onClose={() => {
          setIsOpen(false);
        }}
        plMultiplier={getPlMultiplier(symbol)}
        priceStep={getPriceStep(symbol)}
        quote={quoteAsset === "irt" ? t("irtSymbol") : t("tetherSymbol")}
        symbol={symbol}
      />
    </div>
  );
}

export default HeaderTitle;
