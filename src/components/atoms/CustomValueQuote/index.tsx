import clsx from "clsx";

interface CustomValueQuoteProps {
  value?: string;
  quote?: string;
  dir?: string;
  valueClassName?: string;
  quoteClassName?: string;
  isDisplayQuote?: boolean;
}

function CustomValueQuote({
  quote,
  value,
  quoteClassName,
  valueClassName,
  dir,
  isDisplayQuote = true,
}: CustomValueQuoteProps) {
  return (
    <div dir={dir} className="flex items-end justify-start gap-1">
      {isDisplayQuote ? (
        <p
          className={clsx(
            "text-[10px] text-accentText dark:text-accentTextDark",
            quoteClassName,
          )}
        >
          {quote}
        </p>
      ) : null}
      <p
        className={clsx(
          "mb-px font-english text-xs text-mainText dark:text-mainTextDark",
          valueClassName,
        )}
      >
        {value}
      </p>
    </div>
  );
}

export default CustomValueQuote;
