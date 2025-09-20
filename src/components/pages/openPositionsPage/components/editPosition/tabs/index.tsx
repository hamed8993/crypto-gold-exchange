import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoHelpCircleOutline } from "react-icons/io5";
import CloseHelpDrawer from "../closeHelpDrawer";
import PnlTabHelpDrawer from "../pnlTabHelpDrawer";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const t = useTranslations();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCloseDrawerOpen, setIsCloseDrawerOpen] = useState(false);

  return (
    <div className="flex h-12 min-h-12 w-full items-center justify-between">
      <div
        onClick={() => {
          setActiveTab("editQuantities");
        }}
        className={clsx(
          "flex h-12 w-[50%] items-center justify-center border-b-2",
          activeTab === "editQuantities"
            ? "border-b-negative"
            : "border-b-accentText50",
        )}
      >
        <div className="flex min-w-36 items-center justify-center gap-1">
          <p
            className={clsx(
              "text-sm",
              activeTab === "editQuantities"
                ? "text-negative"
                : "text-mainText",
            )}
          >
            {t("editQuantities")}
          </p>
          <IoHelpCircleOutline
            onClick={() => {
              setIsDrawerOpen(true);
            }}
            className="text-accentText mb-3 h-5 w-5"
          />
        </div>
      </div>
      <div
        onClick={() => {
          setActiveTab("close");
        }}
        className={clsx(
          "flex h-12 w-[50%] items-center justify-center border-b-2",
          activeTab === "close" ? "border-b-negative" : "border-b-accentText50",
        )}
      >
        <div className="flex min-w-36 items-center justify-center gap-1">
          <p
            className={clsx(
              "text-sm",
              activeTab === "close" ? "text-negative" : "text-mainText",
            )}
          >
            {t("close")}
          </p>
          <IoHelpCircleOutline
            onClick={() => {
              setIsCloseDrawerOpen(true);
            }}
            className="text-accentText mb-3 h-5 w-5"
          />
        </div>
      </div>
      {isDrawerOpen && (
        <PnlTabHelpDrawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        />
      )}
      {isCloseDrawerOpen && (
        <CloseHelpDrawer
          isOpen={isCloseDrawerOpen}
          onClose={() => {
            setIsCloseDrawerOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Tabs;
