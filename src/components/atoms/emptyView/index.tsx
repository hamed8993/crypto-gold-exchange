import clsx from "clsx";
import { useTranslations } from "next-intl";
import { CiFolderOff } from "react-icons/ci";

interface Props {
  size?: number;
  text?: string;
  textSize?: number;
  textClassName?: string;
  wrapperClassName?: string;
}

function EmptyView({
  size,
  text,
  textClassName,
  textSize,
  wrapperClassName,
}: Props) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        "flex w-full flex-1 flex-col items-center justify-center gap-2",
        wrapperClassName,
      )}
    >
      <div
        className={clsx(
          "relative flex items-end justify-center",
          size ? `h-[${size}px] w-[${size}px] ` : "h-[120px] w-[120px]",
        )}
      >
        <CiFolderOff className="h-20 w-20 text-accentText dark:text-accentTextDark" />
      </div>

      <p
        className={clsx(
          "text-accentText dark:text-accentTextDark",
          textSize || "text-sm",
          textClassName,
        )}
      >
        {text ? text : t("nothingFound")}
      </p>
    </div>
  );
}

export default EmptyView;
