import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

interface TabItemProps {
  activeTab: string;
  tab: string;
  count?: string | number;
  isDisplayCount?: boolean;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

function TabItem({
  activeTab,
  isDisplayCount = false,
  count,
  setActiveTab,
  tab,
}: TabItemProps) {
  const t = useTranslations();
  return (
    <div
      onClick={() => {
        setActiveTab(tab);
      }}
      className={clsx(
        "-mb-px flex min-h-14 cursor-pointer items-center justify-center gap-1 border-b-2 px-10",
        activeTab === tab
          ? "border-b-mainBrandAlternative"
          : "border-b-transparent",
      )}
    >
      <p
        className={clsx(
          "text-sm",
          activeTab === tab ? "text-mainBrandAlternative" : "text-mainText",
        )}
      >
        {t(tab)}
      </p>
      {isDisplayCount && (
        <p
          className={clsx(
            "font-english text-sm",
            activeTab === tab ? "text-mainBrandAlternative" : "text-mainText",
          )}
        >
          {`(${count})`}
        </p>
      )}
    </div>
  );
}

export default TabItem;
