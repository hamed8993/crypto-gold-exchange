import { useTradeContext } from "@/components/pages/tradePage/provider";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { useAuth } from "@/core/providers/authProvider";
import { useTranslations } from "next-intl";

interface sellButtonProps {
  shortMarket: () => void;
  onShortClick: () => void;
  symbol: string;
}

function SellButton({ shortMarket, onShortClick, symbol }: sellButtonProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { watch } = useTradeContext();
  const { getHighlightedPrice } = usePriceDetail();

  const isOneTapTradeActive = watch("isOneTapTradeActive");

  const shortPrice = getHighlightedPrice(symbol, false);
  return (
    <div
      onClick={() => {
        if (isOneTapTradeActive && isLoggedIn) {
          shortMarket();
        } else {
          onShortClick();
        }
      }}
      className={
        "flex h-20 w-full flex-col items-end justify-around bg-negative px-4"
      }
    >
      <p className={"-mb-7 font-english text-[22px] text-white"}>
        <span>{shortPrice?.mainPrice}</span>
        <span className="text-[22px] font-bold">
          {shortPrice?.highlightPrice}
        </span>
      </p>

      <p className="text-[16px] text-white">{t("short")}</p>
    </div>
  );
}

export default SellButton;
