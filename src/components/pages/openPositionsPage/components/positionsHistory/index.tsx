import ConfirmationDrawer from "@/components/atoms/confirmationDrawer";
import LoadingView from "@/components/atoms/loadingView";
import OrderItem from "@/components/atoms/orderItem";
import type { orderDetail } from "@/components/pages/tradePage/components/tradeFirstScreen/components/positionsHistoryList";
import { ArrayElement } from "@/core/constants/constants";
import { usePnl } from "@/core/hooks/usePnl";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetExchange_dataMarkets,
  useGetHistoryPositions,
  usePostOrderSet_group_close_order,
} from "@/core/services/hooks";
import { GetHistoryPositions } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import EmptyList from "../../../openOrdersPage/components/emptyList";
import EditPositionDrawer from "../editPosition";

function PositionsHistory() {
  const [orderDetail, setOrderDetail] = useState<orderDetail>();
  const [isConfirmationDrawerOpen, setIsConfirmationDrawerOpen] =
    useState(false);
  const { calculatePositionPnl } = usePnl();

  const { firstBidAsk } = useFirstBidAsk();
  const { isLoggedIn } = useAuth();
  const {
    data: positionsHistory,
    refetch,
    isPending,
  } = useGetHistoryPositions(
    {
      status: "open",
    },
    { enabled: isLoggedIn },
  );

  const positionsHistoryList = positionsHistory?.result || [];

  const { data: dataMarkets } = useGetExchange_dataMarkets();

  const getPriceStep = (symbol: string) => {
    const markets = dataMarkets?.result || [];

    const symbolData = markets.filter((item) => {
      return item.symbol === symbol;
    });
    const priceStep = Number(symbolData?.[0]?.price_step);
    return priceStep;
  };

  const getPlMultiplier = (symbol: string) => {
    const markets = dataMarkets?.result || [];

    const symbolData = markets.filter((item) => {
      return item.symbol === symbol;
    });
    const plMultiplier = Number(symbolData?.[0]?.pl_multiplier);
    return plMultiplier;
  };

  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();
  const { mutate, isPending: isPositionDeletePending } =
    usePostOrderSet_group_close_order({
      onSuccess: (data) => {
        refetch();
        setIsConfirmationDrawerOpen(false);
        showSuccess(getSuccessMessages(data.result));
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        showError(getErrorMessages(error.message, error));
      },
    });

  const closePosition = () => {
    mutate({
      requestBody: {
        symbol: orderDetail?.symbol,
        orderId: orderDetail?.orderId,
        entryPrice: orderDetail?.entryPrice,
      },
    });
  };

  const calculatePnL = () => {
    const result = {
      irt: new Decimal(0),
      usd: new Decimal(0),
    };

    for (const item of positionsHistoryList) {
      const { symbol, side, entryPrice, quote, subPositions } = item;

      const subPosCount = subPositions?.length || 0;
      const symbolPriceData = firstBidAsk?.[symbol] || {
        flong: "",
        fshort: "",
      };

      if (!symbolPriceData || subPosCount === 0) continue;

      const currentPrice =
        side === "long"
          ? Number(symbolPriceData?.flong)
          : Number(symbolPriceData?.fshort);

      const priceStep = getPriceStep(symbol);
      const plMultiplier = getPlMultiplier(symbol);

      const pnl =
        item?.side === "long"
          ? Number(
              new Decimal(currentPrice)
                .minus(entryPrice)
                .times(plMultiplier)
                .div(priceStep)
                .toFixed(0),
            )
          : Number(
              new Decimal(entryPrice)
                .minus(currentPrice)
                .times(plMultiplier)
                .div(priceStep)
                .toFixed(0),
            );

      if (quote === "irt") {
        result.irt = result.irt.plus(pnl);
      } else if (quote === "usd") {
        result.usd = result.usd.plus(pnl);
      }
    }
  };

  useEffect(() => {
    calculatePnL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstBidAsk]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ArrayElement<
    GetHistoryPositions["result"]
  > | null>(null);

  const selectItem = (item: ArrayElement<GetHistoryPositions["result"]>) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  return (
    <div className="flex w-full flex-col items-center justify-start px-4 py-4">
      {isPending ? (
        <LoadingView />
      ) : Number(positionsHistoryList?.length) > 0 ? (
        positionsHistoryList?.map((item, index) => {
          return (
            <OrderItem
              base={item?.base}
              created_at={item?.subPositions?.[0]?.created_at}
              entryPrice={item?.entryPrice}
              leverage={item?.leverage}
              onCancel={() => {
                setOrderDetail({
                  orderId: item.orderId,
                  entryPrice: item.entryPrice,
                  symbol: item.symbol,
                });
                setIsConfirmationDrawerOpen(true);
              }}
              onEdit={() => {
                selectItem(item);
              }}
              quote={item?.quote}
              side={item?.side}
              symbol={item?.symbol}
              totalSize={item?.subPositions?.length}
              key={index}
              pnl={addCommaSeparator(calculatePositionPnl(item)?.toString())}
            />
          );
        })
      ) : (
        <EmptyList />
      )}
      {isConfirmationDrawerOpen && (
        <ConfirmationDrawer
          onConfirm={() => {
            closePosition();
          }}
          isPending={isPositionDeletePending}
          isOpen={isConfirmationDrawerOpen}
          onClose={() => {
            setIsConfirmationDrawerOpen(false);
          }}
        />
      )}
      {isOpen && selectedItem && (
        <EditPositionDrawer
          isOpen={isOpen}
          item={selectedItem}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default PositionsHistory;
