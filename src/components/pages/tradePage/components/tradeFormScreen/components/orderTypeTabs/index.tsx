import { localeType } from "@/app/[locale]/layout";
import { rtlLanguages } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface OrderTypeTabsProps {
  isLongOrShort: string;
  orderTypeTab: string;
  setOrderTypeTab: (value: "market" | "pending") => void;
}

function OrderTypeTabs({
  isLongOrShort,
  orderTypeTab,
  setOrderTypeTab,
}: OrderTypeTabsProps) {
  const t = useTranslations();

  const { locale } = useUrl();

  return (
    <div className="bg-surface mx-2 mt-2 flex h-10 w-full items-center justify-between">
      <div
        className={clsx(
          "flex h-10 w-full items-center justify-center border-b-2",
          orderTypeTab === "pending"
            ? isLongOrShort === "long"
              ? "border-b-positive"
              : "border-b-negative"
            : "border-b-transparent",
        )}
        onClick={() => {
          setOrderTypeTab("pending");
        }}
      >
        <p
          className={clsx(
            "text-sm",
            orderTypeTab === "pending"
              ? isLongOrShort === "long"
                ? "text-positive"
                : "text-negative"
              : "text-mainText",
          )}
        >
          {`${t("pendingOrder")}${!rtlLanguages.includes(locale as localeType) ? "" : " - Limit"}`}
        </p>
      </div>
      <div
        className={clsx(
          "flex h-10 w-full items-center justify-center border-b-2",
          orderTypeTab === "market"
            ? isLongOrShort === "long"
              ? "border-positive"
              : "border-b-negative"
            : "border-b-transparent",
        )}
        onClick={() => {
          setOrderTypeTab("market");
        }}
      >
        <p
          className={clsx(
            "text-sm",
            orderTypeTab === "market"
              ? isLongOrShort === "long"
                ? "text-positive"
                : "text-negative"
              : "text-mainText",
          )}
        >
          {`${t("marketOrder")}${!rtlLanguages.includes(locale as localeType) ? "" : " - Market"}`}
        </p>
      </div>
    </div>
  );
}

export default OrderTypeTabs;
