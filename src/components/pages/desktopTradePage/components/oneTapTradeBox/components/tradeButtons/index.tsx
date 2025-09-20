import CustomButton from "@/components/atoms/customButton";
import { useTradeContext } from "@/components/pages/desktopTradePage/provider";
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
import { useTranslations } from "next-intl";

interface TradeButtonsProps {
  symbol: string;
}

function TradeButtons({ symbol }: TradeButtonsProps) {
  const t = useTranslations();
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

  return (
    <div className="flex min-h-8 w-full items-center justify-between gap-1">
      <CustomButton
        onClick={longMarket}
        isLoading={longMarketIsPending}
        isDisabled={isPending}
        className="flex h-8! min-h-8! w-full cursor-pointer items-center justify-center rounded-md bg-positive"
      >
        <p className="text-xs text-white">{t("long")}</p>
      </CustomButton>
      <CustomButton
        isDisabled={isPending}
        onClick={shortMarket}
        isLoading={shortMarketIsPending}
        className="flex h-8! min-h-8! w-full cursor-pointer items-center justify-center rounded-md bg-negative"
      >
        <p className="text-xs text-white">{t("short")}</p>
      </CustomButton>
    </div>
  );
}

export default TradeButtons;
