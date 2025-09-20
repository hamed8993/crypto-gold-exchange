import clsx from "clsx";

interface TabProps {
  activeTab: string;
  title: string;
  value: string;
  onClick: () => void;
}

function Tab({ activeTab, onClick, title, value }: TabProps) {
  return (
    <div
      className={clsx(
        "flex h-10 w-full cursor-pointer items-center justify-center border-b-2",
        activeTab === value ? "border-negative" : "border-accentText50",
      )}
      onClick={onClick}
    >
      <p
        className={clsx(
          "text-sm",
          activeTab === value ? "text-negative" : "text-accentText",
        )}
      >
        {title}
      </p>
    </div>
  );
}

export default Tab;
