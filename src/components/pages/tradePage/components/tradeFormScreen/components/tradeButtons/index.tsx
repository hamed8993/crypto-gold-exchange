/* eslint-disable @typescript-eslint/ban-ts-comment */
// @nosort-imports

import CustomButton from "@/components/atoms/customButton";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetHistoryOrders,
  useGetUser_dataBalance,
  usePostOrderSetLimitLong,
  usePostOrderSetLimitShort,
  usePostOrderSetMarketLong,
  usePostOrderSetMarketShort,
} from "@/core/services/hooks";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTradeContext } from "../../../../provider";

interface TradeButtonsProps {
  isLongOrShort: string;
  orderTypeTab?: string;
  resetPage?: () => void;
}

function TradeButtons({
  isLongOrShort,
  resetPage,
  orderTypeTab,
}: TradeButtonsProps) {
  const t = useTranslations();
  const { watch, reset } = useTradeContext();
  const { market: marketParam } = useParams();

  const { isLoggedIn } = useAuth();

  const { refetch } = useGetUser_dataBalance({ enabled: isLoggedIn });
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { refetch: refetchOrders } = useGetHistoryOrders(
    { status: "pending" },
    { enabled: isLoggedIn },
  );

  const marketParamSplitted =
    typeof marketParam === "string"
      ? marketParam?.split("-")
      : marketParam?.[0].split("-");

  const baseAsset = marketParamSplitted?.[0]?.toLowerCase() || "xau";
  const quoteAsset = marketParamSplitted?.[1]?.toLowerCase() || "usd";

  const symbol = baseAsset + quoteAsset;

  const leverage = watch("leverage");
  const sl_price = watch("sl_price");
  const tp_price = watch("tp_price");
  const entryPrice = watch("entryPrice");
  const contractSize = watch("contractSize");

  const { mutate: openLimitLong, isPending: openLimitLongIsPending } =
    usePostOrderSetLimitLong({
      onSuccess: (data) => {
        showSuccess(getSuccessMessages(data.result));
        reset();
        resetPage?.();
        refetch();
        refetchOrders();
      },
      onError: (error) => {
        //@ts-ignore
        showError(getErrorMessages(error.message.error));
      },
    });

  const { mutate: openLimitShort, isPending: openLimitShortIsPending } =
    usePostOrderSetLimitShort({
      onSuccess: (data) => {
        showSuccess(getSuccessMessages(data.result));
        reset();
        resetPage?.();
        refetch();
        refetchOrders();
      },
      onError: (error) => {
        //@ts-ignore
        showError(getErrorMessages(error.message.error));
      },
    });

  const longLimit = () => {
    openLimitLong({
      requestBody: {
        contractSize: deleteCommas(contractSize),
        entryPrice: deleteCommas(entryPrice),
        symbol: symbol,
        leverage: leverage,
        tpPrice: deleteCommas(tp_price),
        slPrice: deleteCommas(sl_price),
      },
    });
  };

  const shortLimit = () => {
    openLimitShort({
      requestBody: {
        contractSize: deleteCommas(contractSize),
        entryPrice: deleteCommas(entryPrice),
        symbol: symbol,
        leverage: leverage,
        tpPrice: deleteCommas(tp_price),
        slPrice: deleteCommas(sl_price),
      },
    });
  };

  const isDisabled =
    orderTypeTab === "pending"
      ? !(Number(contractSize) > 0 && entryPrice && symbol && leverage)
      : !(Number(contractSize) > 0 && symbol && leverage);

  //////////////
  const { mutate: mutateLongMarket, isPending: longMarketIsPending } =
    usePostOrderSetMarketLong({
      onSuccess: (data) => {
        showSuccess(getSuccessMessages(data.result));
        reset();
        resetPage?.();
        refetch();
        refetchOrders();
      },
      onError: (error) => {
        //@ts-ignore
        showError(getErrorMessages(error.message.error));
      },
    });

  const { mutate: mutateShortMarket, isPending: shortMarketIsPending } =
    usePostOrderSetMarketShort({
      onSuccess: (data) => {
        showSuccess(getSuccessMessages(data.result));
        reset();
        resetPage?.();
        refetch();
        refetchOrders();
      },
      onError: (error) => {
        //@ts-ignore
        showError(getErrorMessages(error.message.error));
      },
    });

  const longMarket = () => {
    mutateLongMarket({
      requestBody: {
        contractSize: deleteCommas(contractSize),
        symbol: symbol,
        leverage: leverage,
        tpPrice: deleteCommas(tp_price),
        slPrice: deleteCommas(sl_price),
      },
    });
  };

  const shortMarket = () => {
    mutateShortMarket({
      requestBody: {
        contractSize: deleteCommas(contractSize),
        symbol: symbol,
        leverage: leverage,
        tpPrice: deleteCommas(tp_price),
        slPrice: deleteCommas(sl_price),
      },
    });
  };

  const isPending =
    openLimitLongIsPending ||
    openLimitShortIsPending ||
    longMarketIsPending ||
    shortMarketIsPending;

  return (
    <StickyComponent className="w-full mb-2 px-2">
      <CustomButton
        onClick={() => {
          if (orderTypeTab === "pending") {
            if (isLongOrShort === "long") {
              longLimit();
            } else {
              shortLimit();
            }
          } else {
            if (isLongOrShort === "long") {
              longMarket();
            } else {
              shortMarket();
            }
          }
        }}
        variant="primary"
        isDisabled={isPending || isDisabled}
        isLoading={isPending}
        className={clsx(
          "h-12  rounded-md border-none opacity-100 w-full",
          isLongOrShort === "long" ? "bg-positive" : "bg-negative",
        )}
      >
        <p className="text-sm text-white">{`${isLongOrShort === "long" ? t("long") : t("short")}`}</p>
      </CustomButton>
    </StickyComponent>
  );
}

export default TradeButtons;
