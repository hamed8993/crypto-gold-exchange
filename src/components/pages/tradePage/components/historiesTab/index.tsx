import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { VscHistory } from "react-icons/vsc";

interface HistoriesTabProps {
  isOrdersHistoryOpen: boolean;
  ordersListLength?: number;
  positionsListLength?: number;
  isPositionsHistoryOpen: boolean;
  onHistoryClick: () => void;
  onOrdersClick: () => void;
  onPositionsClick: () => void;
}

function HistoriesTab({
  isOrdersHistoryOpen,
  onHistoryClick,
  onOrdersClick,
  onPositionsClick,
  isPositionsHistoryOpen,
  ordersListLength,
  positionsListLength,
}: HistoriesTabProps) {
  const { locale } = useUrl();
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  return (
    <div className="border-b-accentText50 mt-6 flex min-h-8 w-[94%] items-center justify-between border-b">
      <div className="-mb-[2px] flex items-center justify-start">
        <div
          onClick={onOrdersClick}
          className={clsx(
            "flex h-8 w-28 min-w-28 flex-col items-center justify-start border-b-2",
            isOrdersHistoryOpen ? "border-b-negative" : "border-b-transparent",
          )}
        >
          <p
            className={clsx(
              "text-xs",
              isOrdersHistoryOpen ? "text-negative" : "text-mainText",
            )}
          >
            {`${t("openOrders")} (${ordersListLength || 0})`}
          </p>
        </div>
        <div
          onClick={onPositionsClick}
          className={clsx(
            "flex h-8 w-28 min-w-28 flex-col items-center justify-start border-b-2",
            isPositionsHistoryOpen
              ? "border-b-negative"
              : "border-b-transparent",
          )}
        >
          <p
            className={clsx(
              "text-xs",
              isPositionsHistoryOpen ? "text-negative" : "text-mainText",
            )}
          >
            {`${t("openPositions")} (${positionsListLength || 0})`}
          </p>
        </div>
      </div>
      {isLoggedIn ? (
        <Link
          href={`/${locale}/${RoutesName.ordersHistory}`}
          className="flex h-8 w-8 flex-col items-center justify-start"
        >
          <VscHistory className="text-mainText h-5 w-5" />
        </Link>
      ) : (
        <div
          className="flex h-8 w-8 flex-col items-center justify-start"
          onClick={onHistoryClick}
        >
          <VscHistory className="text-mainText h-5 w-5" />
        </div>
      )}
    </div>
  );
}

export default HistoriesTab;
