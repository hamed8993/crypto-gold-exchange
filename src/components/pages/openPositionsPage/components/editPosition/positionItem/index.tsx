import OrderItem from "@/components/atoms/orderItem";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetExchange_dataMarkets,
  useGetHistoryPositions,
  usePostOrderSet_fragmented_close_order,
} from "@/core/services/hooks";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import type { SubPositionsItem } from "..";

interface PositionItemProps {
  item: SubPositionsItem;
  onClose: () => void;
}

function PositionItem({ item, onClose }: PositionItemProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { data: dataMarkets } = useGetExchange_dataMarkets();

  const { firstBidAsk } = useFirstBidAsk();

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
  const calculatePositionPnl = () => {
    const symbol = item?.symbol;
    const side = item?.side;
    const entryPrice = Number(item?.entryPrice);

    const symbolPriceData = firstBidAsk?.[symbol] || { flong: "", fshort: "" };
    if (!symbolPriceData) {
      return { orderId: item.orderId, pnl: 0 };
    }

    const symbolCurrentPrice =
      side === "long"
        ? Number(symbolPriceData.flong)
        : Number(symbolPriceData.fshort);

    const priceStep = getPriceStep(symbol); // You define this logic
    const pl_multiplier = getPlMultiplier(symbol); // You define this logic

    const pnl = Number(
      new Decimal(symbolCurrentPrice)
        .minus(entryPrice)
        .div(priceStep)
        .times(pl_multiplier)
        .times(1),
    );
    return pnl;
  };
  const { data: historyList, refetch } = useGetHistoryPositions(
    {
      status: "open",
    },
    { enabled: isLoggedIn },
  );
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { mutate: closeSinglePosition } =
    usePostOrderSet_fragmented_close_order({
      onSuccess: (data) => {
        refetch();
        showSuccess(getSuccessMessages(data.result));
        if (historyList?.result?.length === 0) {
          onClose();
        }
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        showError(getErrorMessages(error.message, error));
      },
    });

  const closeOrder = (uuid: string, symbol: string) => {
    closeSinglePosition({
      requestBody: {
        symbol: symbol,
        positionUuid: uuid,
      },
    });
  };

  return (
    <OrderItem
      base={item?.base}
      created_at={item?.created_at}
      entryPrice={item?.entryPrice}
      leverage={item?.leverage}
      hasEdit={false}
      onCancel={() => {
        closeOrder(item?.uuid, item?.symbol);
      }}
      onEdit={() => {
        console.log("");
      }}
      quote={item?.quote}
      side={item?.side}
      pnl={firstBidAsk && calculatePositionPnl().toString()}
      closeTitle={t("close")}
      symbol={item?.symbol}
      totalSize={"1"}
    />
    // <div className="mt-2 flex h-28 w-full items-center justify-between bg-surface px-2 ">
    //   <div className="flex h-full flex-col items-start justify-center gap-6">
    //     <div className="flex items-center justify-start gap-1">
    //       <p className="font-english text-sm text-mainText ">
    //         {"1"}
    //       </p>
    //       <p className="text-sm text-mainText ">
    //         {t("unit")}
    //       </p>
    //       <p className="text-sm text-mainText ">
    //         {locale === "fa"
    //           ? getMarketName(item?.symbol)?.faName
    //           : getMarketName(item?.symbol)?.enName}
    //       </p>
    //     </div>
    //     <div className="flex items-center justify-start gap-1">
    //       <p className="text-sm text-mainText ">
    //         {t("atPrice")}
    //       </p>
    //       <p className="font-english text-sm text-mainText ">
    //         {addCommaSeparator(item?.entryPrice)}
    //       </p>
    //     </div>
    //   </div>
    //   <div className="flex h-full min-w-20 flex-col items-end justify-center gap-6">
    //     <div className="flex items-center justify-start gap-1 font-english">
    //       <p className="text-sm text-mainText ">
    //         {item?.quote?.toUpperCase()}
    //       </p>
    //       <p className="font-english text-sm text-mainText ">
    //         {firstBidAsk && calculatePositionPnl().toString()}
    //       </p>
    //     </div>
    //     <CustomButton
    //       isDisabled={isPending}
    //       isLoading={isPending}
    //       onClick={() => {
    //         closeOrder(item?.uuid, item?.symbol);
    //       }}
    //       className="flex h-8 min-h-8 w-20 max-w-20 items-center justify-center border border-accentText bg-transparent "
    //     >
    //       <p className="text-xs text-mainText ">
    //         {t("close")}
    //       </p>
    //     </CustomButton>
    //   </div>
    // </div>
  );
}

export default PositionItem;
