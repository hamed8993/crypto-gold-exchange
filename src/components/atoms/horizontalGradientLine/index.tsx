import clsx from "clsx";

interface HorizontalGradientLineProps {
  className?: string;
}

function HorizontalGradientLine({ className }: HorizontalGradientLineProps) {
  return (
    <div
      className={clsx(
        "mb-5 mt-8 h-px w-full self-center bg-linear-to-r from-transparent via-accentText to-transparent dark:via-accentTextDark",
        className,
      )}
    ></div>
  );
}

export default HorizontalGradientLine;
