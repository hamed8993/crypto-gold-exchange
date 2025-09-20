import clsx from "clsx";
import { useTranslations } from "next-intl";

interface TabsProps {
  isMainToMargin: boolean;
  onMainClick: () => void;
  onMarginClick: () => void;
}

function Tabs({ isMainToMargin, onMainClick, onMarginClick }: TabsProps) {
  const t = useTranslations();

  return (
    <div className="bg-surface mt-2 mb-7 flex h-14 min-h-14 w-full items-center justify-between gap-2 rounded-full p-3">
      <div
        onClick={onMainClick}
        className={clsx(
          "flex h-10 w-[50%] cursor-pointer items-center justify-center rounded-full",
          isMainToMargin ? "bg-positive" : "bg-transparent",
        )}
      >
        <p
          className={clsx(
            "text-xs",
            isMainToMargin ? "text-white" : "text-mainText",
          )}
        >
          {t("mainToMarginTitle")}
        </p>
      </div>
      <div
        onClick={onMarginClick}
        className={clsx(
          "flex h-10 w-[50%] cursor-pointer items-center justify-center rounded-full",
          isMainToMargin ? "bg-transparent" : "bg-positive",
        )}
      >
        <p
          className={clsx(
            "text-xs",
            isMainToMargin ? "text-mainText" : "text-white",
          )}
        >
          {t("marginToMainTitle")}
        </p>
      </div>
    </div>
  );
}

export default Tabs;
