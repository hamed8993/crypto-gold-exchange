import { useWithdrawContext } from "@/components/pages/withdrawPage/provider";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface CoinItemProps {
  coin: string;
}

function CoinItem({ coin }: CoinItemProps) {
  const t = useTranslations();

  const { watch, setValue } = useWithdrawContext();

  const asset = watch("asset");

  const selectCoin = (coin: string) => {
    setValue("asset", coin);
  };

  return (
    <div
      className={clsx(
        "my-1 flex w-full items-center justify-center rounded-lg px-2 py-3",
        asset === coin
          ? asset === "irt"
            ? "bg-positive"
            : "bg-mainBrandAlternative"
          : "border-accentText50 border",
      )}
      onClick={() => {
        selectCoin(coin);
      }}
    >
      <p
        className={clsx(
          "text-xs",
          asset === coin ? "text-white" : "text-accentText",
        )}
        dir="ltr"
      >
        {coin === "irt" ? t("irtWithdrawal") : t("usdWithdrawal")}
      </p>
    </div>
  );
}

export default CoinItem;
