import { localeType } from "@/app/[locale]/layout";
import CustomDateTime from "@/components/atoms/customDateTime";
import { SubPositionsItem } from "@/components/pages/openPositionsPage/components/editPosition";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { useNotification } from "@/core/providers/notificationProvider";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { MdContentCopy } from "react-icons/md";

interface OpenCloseBoxProps {
  item?: SubPositionsItem;
}

function OpenCloseBox({ item }: OpenCloseBoxProps) {
  const t = useTranslations();
  const { showSuccess } = useNotification();

  const { locale } = useUrl();

  const { getMarketName, getQuoteName } = useMarketsNamesData();

  const handleCopy = (copyValue: string) => {
    navigator.clipboard.writeText(copyValue);
    showSuccess(t("successfullyCopied"));
  };

  return (
    <div className="px-2">
      <div className="border-accentText50 mt-2 grid w-full grid-cols-2 grid-rows-3 border-b pt-3 pb-1">
        <div className="flex min-h-6 w-full items-center justify-start gap-1 whitespace-nowrap">
          <div
            className={clsx(
              "flex items-center justify-center rounded-md p-1 px-3 opacity-70",
              item?.side === "long" ? "bg-positive" : "bg-negative",
            )}
          >
            <p className="text-xs text-white">{t(item?.side || "")}</p>
            <p className="text-xs text-white">{"-"}</p>
            <p className="text-xs text-white">{item?.side?.toUpperCase()}</p>
          </div>

          <div
            className={
              "bg-mainBrandAlternative flex items-center justify-center rounded-md px-2 py-1 opacity-70"
            }
          >
            <p className="font-english text-xs text-white">{`${item?.leverage}X`}</p>
          </div>

          {locale === "fa" && (
            <p className="text-mainText text-xs">
              {getMarketName(item?.symbol || "")[locale as localeType]}
            </p>
          )}

          <p className="text-accentText text-xs leading-none">
            {item?.symbol.toUpperCase()}
          </p>
        </div>

        <div className="flex min-h-6 w-full items-center justify-end gap-[2px] whitespace-nowrap">
          <p className="font-english text-mainText text-xs">{"1"}</p>
          <p className="text-mainText text-xs">{t("unit")}</p>
        </div>

        <div className="flex min-h-6 items-center justify-start gap-1 whitespace-nowrap">
          <p className="text-accentText text-xs">{`${t("entryPrice")}:`}</p>
          <p className="font-english text-mainText text-sm">
            {addCommaSeparator(item?.entryPrice || "")}
          </p>
          {addCommaSeparator(item?.entryPrice || "") && (
            <p className="text-accentText text-xs">
              {getQuoteName(item?.quote || "")}
            </p>
          )}
        </div>

        <div className="flex min-h-6 items-center justify-end gap-1 whitespace-nowrap">
          <p className="text-accentText text-xs">{`${t("stopLoss")}:`}</p>
          <p className="font-english text-mainText text-sm">
            {addCommaSeparator(item?.slPrice || "") || "--"}
          </p>
          {addCommaSeparator(item?.slPrice || "") && (
            <p className="text-accentText text-xs">
              {getQuoteName(item?.quote || "")}
            </p>
          )}
        </div>

        <div className="flex min-h-6 w-full items-center justify-start gap-1 whitespace-nowrap">
          <p className="text-accentText text-xs">{`${t("exitPrice")}:`}</p>
          <p className="font-english text-mainText text-sm">
            {addCommaSeparator(item?.exitPrice || "")}
          </p>
          {addCommaSeparator(item?.exitPrice || "") && (
            <p className="text-accentText text-xs">
              {getQuoteName(item?.quote || "")}
            </p>
          )}
        </div>

        <div className="flex min-h-6 items-center justify-end gap-1 whitespace-nowrap">
          <p className="text-accentText text-xs">{`${t("targetPoint")}:`}</p>
          <p className="font-english text-mainText text-sm">
            {addCommaSeparator(item?.tpPrice || "") || "--"}
          </p>
          {addCommaSeparator(item?.tpPrice || "") && (
            <p className="text-accentText text-xs">
              {getQuoteName(item?.quote || "")}
            </p>
          )}
        </div>

        <div className="col-span-2 flex min-h-6 w-full items-center justify-start gap-1">
          <p className="text-accentText text-xs">{`${t("entryTime")}:`}</p>
          <CustomDateTime timeStamp={item?.created_at as string} />
        </div>

        <div className="col-span-2 flex min-h-6 items-center justify-start gap-1">
          <p className="text-accentText text-xs">{`${t("exitTime")}:`}</p>
          <CustomDateTime timeStamp={item?.updated_at as string} />
        </div>

        <div className="col-span-2 flex min-h-6 items-center justify-start gap-1">
          <p className="text-accentText text-xs">{`${t("orderId")}:`}</p>
          <div
            className="flex items-center justify-start gap-1"
            onClick={() => handleCopy(item?.orderId || "")}
          >
            <p
              className="font-english text-accentText max-w-[150px] truncate text-xs"
              dir="ltr"
            >
              {item?.orderId}
            </p>
            <MdContentCopy className="text-negative" />
          </div>
        </div>

        <div className="col-span-2 flex min-h-6 items-center justify-start gap-1">
          <p className="text-accentText text-xs">{`${t("positionId")}:`}</p>
          <div
            className="flex items-center justify-start gap-1"
            onClick={() => handleCopy(item?.positionId || "")}
          >
            <p
              className="font-english text-accentText max-w-[150px] truncate text-xs"
              dir="ltr"
            >
              {item?.positionId}
            </p>
            <MdContentCopy className="text-negative" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenCloseBox;
