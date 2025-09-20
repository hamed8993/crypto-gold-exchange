import ConfirmationDrawer from "@/components/atoms/confirmationDrawer";
import EmptyView from "@/components/atoms/emptyView";
import OrderItem from "@/components/atoms/orderItem";
import EditPositionDrawer from "@/components/pages/openPositionsPage/components/editPosition";
import { useTradeContext } from "@/components/pages/tradePage/provider";
import { ArrayElement } from "@/core/constants/constants";
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
import { useState } from "react";

export type orderDetail = {
  orderId: string;
  entryPrice: string;
  symbol: string;
};

interface PositionsHistoryListProps {
  isPositionsHistoryOpen: boolean;
}

function PositionsHistoryList({
  isPositionsHistoryOpen,
}: PositionsHistoryListProps) {
  const { reset } = useTradeContext();
  const { isLoggedIn } = useAuth();
  const { firstBidAsk } = useFirstBidAsk();
  const [orderDetail, setOrderDetail] = useState<orderDetail>();
  const { data: positionsHistory, refetch } = useGetHistoryPositions(
    {
      status: "open",
    },
    { enabled: isLoggedIn },
  );

  const positionsHistoryList = positionsHistory?.result;

  const { data: dataMarkets } = useGetExchange_dataMarkets();
  const [isConfirmationDrawerOpen, setIsConfirmationDrawerOpen] =
    useState(false);
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();
  const { mutate, isPending } = usePostOrderSet_group_close_order({
    onSuccess: (data) => {
      refetch();
      reset();
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
 
  const calculatePositionPnl = (
    item: ArrayElement<GetHistoryPositions["result"]>,
  ) => {
    const symbol = item.symbol;
    const side = item.side;
    const entryPrice = Number(item.entryPrice);
    const subPosCount = item.subPositions?.length || 0;

    const symbolPriceData = firstBidAsk?.[symbol] || { flong: "", fshort: "" };
    if (!symbolPriceData || subPosCount === 0) {
      return { orderId: item.orderId, pnl: 0 };
    }

    const symbolCurrentPrice =
      side === "long"
        ? Number(symbolPriceData.flong)
        : Number(symbolPriceData.fshort);

    const priceStep = getPriceStep(symbol);
    const pl_multiplier = getPlMultiplier(symbol);

    const pnl =
      side === "long"
        ? Number(
            new Decimal(symbolCurrentPrice)
              .minus(entryPrice)
              .div(priceStep)
              .times(pl_multiplier)
              .times(subPosCount),
          )
        : Number(
            new Decimal(entryPrice)
              .minus(symbolCurrentPrice)
              .div(priceStep)
              .times(pl_multiplier)
              .times(subPosCount),
          );
    return pnl;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ArrayElement<
    GetHistoryPositions["result"]
  > | null>(null);

  const selectItem = (item: ArrayElement<GetHistoryPositions["result"]>) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  return (
    <>
      {isPositionsHistoryOpen ? (
        <div className="flex w-full flex-col items-center justify-start px-2">
          {Number(positionsHistoryList?.length) > 0 ? (
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
                  pnl={addCommaSeparator(calculatePositionPnl(item).toString())}
                />
              );
            })
          ) : (
            <EmptyView />
          )}

          {isConfirmationDrawerOpen && (
            <ConfirmationDrawer
              onConfirm={() => {
                closePosition();
              }}
              isPending={isPending}
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
      ) : null}
    </>
  );
}

export default PositionsHistoryList;
