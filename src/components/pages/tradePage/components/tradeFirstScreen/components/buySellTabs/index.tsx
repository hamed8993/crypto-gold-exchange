import { useTradeContext } from "@/components/pages/tradePage/provider";
import { usePnl } from "@/core/hooks/usePnl";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetHistoryOrders,
  useGetHistoryPositions,
  useGetUser_dataBalance,
  usePostOrderSetMarketLong,
  usePostOrderSetMarketShort,
} from "@/core/services/hooks";
import { Success } from "@/core/services/types";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import { useEffect } from "react";
import BuyButton from "./components/buyButton";
import InputComponent from "./components/inputComponent";
import SellButton from "./components/sellButton";
import SpreadComponent from "./components/spreadComponent";

interface BuySellTabsProps {
  onLongClick: () => void;
  onShortClick: () => void;
  symbol: string;
  spread: number;
}

function BuySellTabs({
  onLongClick,
  onShortClick,
  spread,
  symbol,
}: BuySellTabsProps) {
  const { isLoggedIn } = useAuth();
  const { getLeverages } = usePnl();
  const { setValue, watch, reset } = useTradeContext();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const leverage = watch("leverage");
  const contractSize = watch("contractSize");

  const leverages = getLeverages(symbol);

  const { refetch: refetchOrders } = useGetHistoryOrders(
    { status: "pending" },
    { enabled: isLoggedIn },
  );

  const { refetch: refetchPositions } = useGetHistoryPositions(
    {},
    { enabled: isLoggedIn },
  );

  const { refetch } = useGetUser_dataBalance({ enabled: isLoggedIn });

  const resetOnSuccess = (data: Success) => {
    showSuccess(getSuccessMessages(data.result));
    reset();
    refetch();
    refetchPositions();
    refetchOrders();
    setValue("leverage", leverages?.[0]);
    setValue("isOneTapTradeActive", true);
  };

  const { mutate: mutateLongMarket, isPending: longMarketIsPending } =
    usePostOrderSetMarketLong({
      onSuccess: (data) => {
        resetOnSuccess(data);
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        showError(getErrorMessages(error.message.error));
      },
    });

  const { mutate: mutateShortMarket, isPending: shortMarketIsPending } =
    usePostOrderSetMarketShort({
      onSuccess: (data) => {
        resetOnSuccess(data);
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        showError(getErrorMessages(error.message.error));
      },
    });

  const isPending = shortMarketIsPending || longMarketIsPending;

  const requestBody = {
    contractSize: deleteCommas(contractSize),
    symbol: symbol,
    leverage: leverage,
    tpPrice: "",
    slPrice: "",
  };

  const longMarket = () => {
    if (!isPending) {
      mutateLongMarket({
        requestBody: requestBody,
      });
    }
  };

  const shortMarket = () => {
    if (!isPending) {
      mutateShortMarket({
        requestBody: requestBody,
      });
    }
  };

  useEffect(() => {
    const oneTapTrade = localStorage.getItem("oneTapTrade");
    if (oneTapTrade === "true") {
      setValue("isOneTapTradeActive", true);
    } else if (oneTapTrade === "false") {
      setValue("isOneTapTradeActive", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex h-20 w-full items-center justify-between">
      <BuyButton
        longMarket={longMarket}
        onLongClick={onLongClick}
        symbol={symbol}
      />

      <InputComponent symbol={symbol} />

      <SpreadComponent spread={spread} />

      <SellButton
        onShortClick={onShortClick}
        shortMarket={shortMarket}
        symbol={symbol}
      />
    </div>
  );
}

export default BuySellTabs;
