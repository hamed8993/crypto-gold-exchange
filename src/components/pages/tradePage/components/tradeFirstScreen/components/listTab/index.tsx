import { useAuth } from "@/core/providers/authProvider";
import { useGetHistoryPositions } from "@/core/services/hooks";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoChevronDownOutline, IoHelpCircleOutline } from "react-icons/io5";
import PositionHelpDrawer from "../positionHelpDrawer";

interface PositionsHistoryTabProps {
  isPositionsHistoryOpen: boolean;
  setIsPositionsHistoryOpen: (value: boolean) => void;
}

function PositionsHistoryTab({
  isPositionsHistoryOpen,
  setIsPositionsHistoryOpen,
}: PositionsHistoryTabProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { data: positionsHistory } = useGetHistoryPositions(
    {
      status: "open",
    },
    { enabled: isLoggedIn },
  );

  const positionsHistoryList = positionsHistory?.result;

  return (
    <div
      onClick={() => {
        if (Number(positionsHistoryList?.length) > 0) {
          setIsPositionsHistoryOpen(!isPositionsHistoryOpen);
        }
      }}
      className="border-b-accentText50 flex min-h-14 w-full items-center justify-between border-b px-2"
    >
      <div className="flex items-center justify-start gap-1">
        <p
          className={clsx(
            "text-sm",
            Number(positionsHistoryList?.length) > 0
              ? "text-mainText"
              : "text-accentText",
          )}
        >
          {t("openPositions")}
        </p>
        <IoHelpCircleOutline
          onClick={() => {
            setIsOpen(true);
          }}
          className="text-accentText mb-3 h-5 w-5"
        />
      </div>

      <IoChevronDownOutline
        className={clsx(
          "h-4 w-4",
          isPositionsHistoryOpen ? "rotate-180" : "",
          Number(positionsHistoryList?.length) > 0
            ? "text-mainText"
            : "text-accentText rotate-0",
        )}
      />
      <PositionHelpDrawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
}

export default PositionsHistoryTab;
