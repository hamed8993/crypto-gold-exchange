import { usePnl } from "@/core/hooks/usePnl";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useTradeContext } from "../../provider";
import BalancesRow from "../balancesRows";
import LiquidAndSl from "../liquidAndSl";
import MarginAndTpAmount from "../marginAndTpAmount";
import PricesAndVolumeInput from "../pricesAndVolumeInput";
import TpSlInputs from "../tpSlInputs";
import TradeTypeTabs from "../tradeTypeTabs";

interface InputsBoxProps {
  symbol: string;
  quote: string;
}

function InputsBox({ symbol, quote }: InputsBoxProps) {
  const t = useTranslations();
  const { getLeverages } = usePnl();
  const leverages = getLeverages(symbol);
  const { watch, setValue, setError, clearErrors } = useTradeContext();
  const { getPriceStep } = usePriceDetail();
  const priceStep = getPriceStep(symbol);
  const entryPrice = watch("entryPrice");
  const tp_price = watch("tp_price");
  const sl_price = watch("sl_price");
  const leverage = watch("leverage");

  const validatePrice = (price: number, step: number) => {
    if (Number(new Decimal(price).mod(step)) === 0) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (
      priceStep &&
      entryPrice &&
      !validatePrice(Number(deleteCommas(entryPrice)), priceStep)
    ) {
      setError("entryPrice", { message: t("priceIsNotValid") });
    } else {
      clearErrors("entryPrice");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryPrice]);

  useEffect(() => {
    if (
      priceStep &&
      tp_price &&
      !validatePrice(Number(deleteCommas(tp_price)), priceStep)
    ) {
      setError("tp_price", { message: t("priceIsNotValid") });
    } else {
      clearErrors("tp_price");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tp_price]);

  useEffect(() => {
    if (
      priceStep &&
      sl_price &&
      !validatePrice(Number(deleteCommas(sl_price)), priceStep)
    ) {
      setError("sl_price", { message: t("priceIsNotValid") });
    } else {
      clearErrors("sl_price");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sl_price]);

  useEffect(() => {
    if (!leverage && leverages) {
      setValue("leverage", leverages?.[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leverages, leverage]);

  return (
    <div className="flex h-fit w-full flex-col items-center justify-start">
      <TradeTypeTabs symbol={symbol} />
      <PricesAndVolumeInput symbol={symbol} />

      <TpSlInputs symbol={symbol} />
      <MarginAndTpAmount quote={quote} symbol={symbol} />
      <LiquidAndSl quote={quote} symbol={symbol} />
      <BalancesRow />
    </div>
  );
}

export default InputsBox;
