import clsx from "clsx";
import { ReactNode, useState } from "react";

type Tab = {
  content: ReactNode;
  key: string;
  label: string;
};

interface CustomTabProps {
  defaultTab?: string;
  tabs: Tab[];
}

const CustomTab = ({ tabs, defaultTab }: CustomTabProps) => {
  const [activeIndex, setActiveIndex] = useState<string>(
    defaultTab || tabs[0].key,
  );

  return (
    <div className="w-full">
      <div className="flex border-b border-border">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(tab.key)}
            className={clsx(
              "px-4 py-2 transition-colors duration-200",
              activeIndex === tab.key
                ? "translate-y-px border-b-2 border-mainBrand font-semibold text-mainBrand"
                : "text-gray-500 hover:text-mainBrand",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {tabs.find((item) => item.key === activeIndex)?.content}
      </div>
    </div>
  );
};

export default CustomTab;
