/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomButton from "@/components/atoms/customButton";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetHistoryOrders,
  useGetHistoryPositions,
  useGetUser_dataBalance,
  usePostOrderSetLimitLong,
  usePostOrderSetLimitShort,
  usePostOrderSetMarketLong,
  usePostOrderSetMarketShort,
} from "@/core/services/hooks";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useTradeContext } from "../../provider";

interface LongShortButtonsProps {
  symbol: string;
}

function LongShortButtons({ symbol }: LongShortButtonsProps) {
  const t = useTranslations();
  const { watch, reset, setValue } = useTradeContext();

  const { isLoggedIn } = useAuth();
  const { refetch: refetchHistory } = useGetHistoryOrders(
    {
      status: "pending",
    },
    { enabled: isLoggedIn },
  );
  const { refetch: refetchPositionHistory } = useGetHistoryPositions(
    {
      status: "open",
    },
    { enabled: isLoggedIn },
  );
  const { refetch } = useGetUser_dataBalance({ enabled: isLoggedIn });
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { refetch: refetchOrders } = useGetHistoryOrders(
    { status: "pending" },
    { enabled: isLoggedIn },
  );

  const leverage = watch("leverage");
  const orderTypeTab = watch("orderType");
  const sl_price = watch("sl_price");
  const tp_price = watch("tp_price");
  const entryPrice = watch("entryPrice");
  const contractSize = watch("contractSize");
  const side = watch("side");

  const { mutate: openLimitLong, isPending: openLimitLongIsPending } =
    usePostOrderSetLimitLong({
      onSuccess: (data) => {
        showSuccess(getSuccessMessages(data.result));
        reset();
        refetchHistory();
        refetchPositionHistory();
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
        refetchPositionHistory();

        refetchHistory();
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

  const { mutate: mutateLongMarket, isPending: longMarketIsPending } =
    usePostOrderSetMarketLong({
      onSuccess: (data) => {
        showSuccess(getSuccessMessages(data.result));
        reset();
        refetchPositionHistory();

        refetchHistory();
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
        refetchPositionHistory();

        refetchHistory();
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
    <div className="flex h-12 w-full items-center justify-start gap-2">
      <CustomButton
        onClick={() => {
          if (orderTypeTab === "pending") {
            if (side === "long") {
              longLimit();
            } else {
              shortLimit();
            }
          } else {
            if (side === "long") {
              longMarket();
            } else {
              shortMarket();
            }
          }
        }}
        isDisabled={isPending || isDisabled}
        isLoading={isPending}
        variant="primary"
        className={clsx(
          "min-h-11 w-full items-center justify-center",
          side === "long" ? "bg-positive" : "bg-negative",
        )}
      >
        <p>{t(side)}</p>
      </CustomButton>

      <div className="bg-secondBackground flex h-12 min-h-12 w-80 min-w-80 items-center justify-between rounded-full p-1.5">
        <div
          onClick={() => {
            setValue("side", "long");
          }}
          className={clsx(
            "flex h-full w-full cursor-pointer items-center justify-center rounded-full",
            side === "long" ? "bg-positive" : "",
          )}
        >
          <p
            className={clsx(
              "text-[12px]",
              side === "long" ? "text-white" : "text-mainText",
            )}
          >
            {t("long")}
          </p>
        </div>
        <div
          onClick={() => {
            setValue("side", "short");
          }}
          className={clsx(
            "flex h-full w-full cursor-pointer items-center justify-center rounded-full",
            side === "short" ? "bg-negative" : "",
          )}
        >
          <p
            className={clsx(
              "text-[12px]",
              side === "short" ? "text-white" : "text-mainText",
            )}
          >
            {t("short")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LongShortButtons;
