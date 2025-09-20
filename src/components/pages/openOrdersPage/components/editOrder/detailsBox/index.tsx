import { localeType } from "@/app/[locale]/layout";
import CustomDateTime from "@/components/atoms/customDateTime";
import { ArrayElement } from "@/core/constants/constants";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { useNotification } from "@/core/providers/notificationProvider";
import { GetHistoryOrders } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { MdContentCopy } from "react-icons/md";
import ItemBox from "../itemBox";

interface DetailsBoxProps {
  item: ArrayElement<GetHistoryOrders["result"]>;
}

function DetailsBox({ item }: DetailsBoxProps) {
  const t = useTranslations();
  const { locale } = useUrl();
  const { getMarketName, getQuoteName } = useMarketsNamesData();
  const { showSuccess } = useNotification();

  const handleCopy = (copyValue: string) => {
    navigator.clipboard.writeText(copyValue);
    showSuccess(t("successfullyCopied"));
  };

  return (
    <div className="mt-2 flex w-full flex-col items-center justify-start py-5 pb-5">
      <div className="flex h-7 w-full items-center justify-between px-5">
        <ItemBox
          title={t("market")}
          value={getMarketName(item?.symbol)[locale as localeType]}
        />
        <ItemBox
          title={t("singleSymbol")}
          value={item?.symbol?.toUpperCase()}
        />
      </div>
      <div className="flex h-7 w-full items-center justify-between px-5">
        <ItemBox
          title={t("orderType")}
          value={`${t(item?.side)} - ${item?.side?.toUpperCase()}`}
          valueClassName={
            item?.side === "long" ? "text-positive" : "text-negative"
          }
        />
        <ItemBox title={t("leverage")} value={`${item?.leverage}X`} />
      </div>
      <div className="flex h-7 w-full items-center justify-between px-5">
        <ItemBox
          title={t("entryPrice")}
          value={
            <div className="flex items-center justify-start gap-1">
              <p className="font-english text-mainText text-xs">
                {addCommaSeparator(item?.entryPrice)}
              </p>
              <p className="text-accentText text-xs">
                {getQuoteName(item?.quote)}
              </p>
            </div>
          }
        />
        <ItemBox
          title={t("targetPoint")}
          value={
            item?.tpPrice !== "not_set" ? (
              <div className="flex items-center justify-start gap-1">
                <p className="font-english text-mainText text-xs">
                  {addCommaSeparator(item?.tpPrice)}
                </p>
                <p className="text-accentText text-xs">
                  {getQuoteName(item?.quote)}
                </p>
              </div>
            ) : (
              t("notProvided")
            )
          }
        />
      </div>
      <div className="flex h-7 w-full items-center justify-between px-5">
        <ItemBox
          title={t("stopLoss")}
          value={
            item?.slPrice !== "not_set" ? (
              <div className="flex items-center justify-start gap-1">
                <p className="font-english text-mainText text-xs">
                  {addCommaSeparator(item?.slPrice)}
                </p>
                <p className="text-accentText text-xs">
                  {getQuoteName(item?.quote)}
                </p>
              </div>
            ) : (
              t("notProvided")
            )
          }
        />

        <ItemBox
          title={t("time")}
          value={<CustomDateTime timeStamp={item?.created_at} />}
        />
      </div>
      <div className="flex h-fit w-full items-center justify-between px-5">
        <ItemBox
          title={t("orderId")}
          value={
            <div className="flex h-fit w-full items-start justify-start gap-1">
              <p className="font-english text-accentText text-left text-xs break-all">
                {item?.orderId}
              </p>
              <div
                onClick={() => {
                  handleCopy(item?.orderId);
                }}
                className="flex h-4 w-4 items-center justify-center"
              >
                <MdContentCopy className="text-mainBrandAlternative mb-1 h-4 w-4" />
              </div>
            </div>
          }
        />
      </div>
      <div className="bg-accentText50 mt-5 flex h-px w-full"></div>
    </div>
  );
}

export default DetailsBox;
