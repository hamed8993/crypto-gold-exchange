import clsx from "clsx";
import { useTranslations } from "next-intl";

interface TimesTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

function TimesTabs({ activeTab, setActiveTab }: TimesTabsProps) {
  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };
  const t = useTranslations();

  return (
    <div className="flex min-h-11 w-full items-center justify-between">
      <div
        onClick={() => {
          toggleTab("lastMonth");
        }}
        className={clsx(
          "flex h-full w-[33%] items-center justify-center border-b-2",
          activeTab === "lastMonth"
            ? "border-b-negative"
            : "border-b-accentText50",
        )}
      >
        <p
          className={clsx(
            "text-sm",
            activeTab === "lastMonth" ? "text-negative" : "text-mainText",
          )}
        >
          {t("lastMonth")}
        </p>
      </div>
      <div
        onClick={() => {
          toggleTab("lastThreeMonth");
        }}
        className={clsx(
          "flex h-full w-[33%] items-center justify-center border-b-2",
          activeTab === "lastThreeMonth"
            ? "border-b-negative"
            : "border-b-accentText50",
        )}
      >
        <p
          className={clsx(
            "text-sm",
            activeTab === "lastThreeMonth" ? "text-negative" : "text-mainText",
          )}
        >
          {t("lastThreeMonth")}
        </p>
      </div>
      <div
        onClick={() => {
          toggleTab("all");
        }}
        className={clsx(
          "flex h-full w-[33%] items-center justify-center border-b-2",
          activeTab === "all" ? "border-b-negative" : "border-b-accentText50",
        )}
      >
        <p
          className={clsx(
            "text-sm",
            activeTab === "all" ? "text-negative" : "text-mainText",
          )}
        >
          {t("allHistory")}
        </p>
      </div>
    </div>
  );
}

export default TimesTabs;
