import { useTradeContext } from "@/components/pages/tradePage/provider";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { useAuth } from "@/core/providers/authProvider";
import { useTranslations } from "next-intl";

interface BuyButtonProps {
  longMarket: () => void;
  onLongClick: () => void;
  symbol: string;
}

function BuyButton({ longMarket, onLongClick, symbol }: BuyButtonProps) {
  const { isLoggedIn } = useAuth();
  const { watch } = useTradeContext();
  const t = useTranslations();

  const isOneTapTradeActive = watch("isOneTapTradeActive");
  const { getHighlightedPrice } = usePriceDetail();

  const longPrice = getHighlightedPrice(symbol, true);

  return (
    <div
      onClick={() => {
        if (isOneTapTradeActive && isLoggedIn) {
          longMarket();
        } else {
          onLongClick();
        }
      }}
      className={
        "flex h-20 w-full flex-col items-start justify-around bg-positive px-4"
      }
    >
      <p className={"-mb-7 font-english text-[22px] text-white"}>
        <span>{longPrice?.mainPrice}</span>
        <span className="text-[22px] font-bold">
          {longPrice?.highlightPrice}
        </span>
      </p>

      <p className="text-[16px] text-white">{t("long")}</p>
    </div>
  );
}

export default BuyButton;
