import { ArrayElement } from "@/core/constants/constants";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { usePnl } from "@/core/hooks/usePnl";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import { GetHistoryPositions } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { FiEdit } from "react-icons/fi";
import OrderItem from "../orderItem";

interface PositionProps {
  item: ArrayElement<GetHistoryPositions["result"]>;
  setIsEditPositionModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsClosePositionModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedPosition: Dispatch<
    SetStateAction<ArrayElement<GetHistoryPositions["result"]> | undefined>
  >;
}

function Position({
  item,
  setIsClosePositionModalOpen,
  setIsEditPositionModalOpen,
  setSelectedPosition,
}: PositionProps) {
  const t = useTranslations();

  const { calculatePositionPnl } = usePnl();
  const { getFontColor } = usePriceDetail();
  const { getMarketName } = useMarketsNamesData();
  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();

  const totalPnl = calculatePositionPnl(item)?.toString();

  return (
    <div className="flex h-12 min-h-12 w-full items-center justify-between">
      <div className="flex min-h-10 w-full items-center justify-between">
        <OrderItem title={getMarketName(item?.symbol).fa || ""} />
        <OrderItem
          textClassName={
            item?.side === "long" ? "!text-positive" : "!text-negative"
          }
          title={t(item?.side)}
        />
        <OrderItem isEnglish title={`${item?.leverage}X`} />
        <OrderItem isEnglish title={addCommaSeparator(item?.entryPrice)} />
        <OrderItem isEnglish title={addCommaSeparator(item?.tpPrice) || "--"} />
        <OrderItem isEnglish title={addCommaSeparator(item?.slPrice) || "--"} />
        <OrderItem
          isEnglish
          title={
            convertMillisecondToLocal(item?.subPositions?.[0]?.created_at)
              .dateTime || "--"
          }
        />
        <OrderItem
          isEnglish
          textClassName={getFontColor(Number(totalPnl))}
          title={addCommaSeparator(totalPnl)}
        />
        <OrderItem
          extraComponent={
            <div
              onClick={() => {
                setSelectedPosition(item);
                setTimeout(() => {
                  setIsEditPositionModalOpen(true);
                }, 400);
              }}
              className="flex cursor-pointer items-center justify-center"
            >
              <FiEdit className="text-lg text-mainBrandAlternative" />
            </div>
          }
          onClick={() => {
            setSelectedPosition(item);
            setTimeout(() => {
              setIsClosePositionModalOpen(true);
            }, 400);
          }}
          isButton
          title={t("close")}
        />
      </div>
    </div>
  );
}

export default Position;
