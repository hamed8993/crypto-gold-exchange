import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import clsx from "clsx";

interface DetailItemProps {
  title: string;
  value: string;
  quote: string;
  wrapperClassName?: string;
  titleClassName?: string;
  valueClassName?: string;
}

function DetailItem({
  quote,
  title,
  value,
  wrapperClassName,
  titleClassName,
  valueClassName,
}: DetailItemProps) {
  const { getQuoteName } = useMarketsNamesData();
  return (
    <div
      className={clsx(
        "flex h-full w-full flex-col items-center justify-center gap-4",
        wrapperClassName,
      )}
    >
      <p className={clsx("text-accentText text-sm", titleClassName)}>{title}</p>
      <div className={"flex items-center justify-start gap-1"}>
        <p
          className={clsx("font-english text-mainText text-sm", valueClassName)}
        >
          {addCommaSeparator(value)}
        </p>
        <p className={clsx("text-accentText text-sm", valueClassName)}>
          {quote ? getQuoteName(quote) : ""}
        </p>
      </div>
    </div>
  );
}

export default DetailItem;
