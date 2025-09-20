import { BsArrowBarRight } from "react-icons/bs";

interface SpreadProps {
  spreadValue: string | number;
}

function Spread({ spreadValue }: SpreadProps) {
  return (
    <div className="absolute right-[calc(50%-30px)] mt-5 flex h-6! w-16 items-center justify-between self-start rounded-[4px] bg-surface px-1 dark:bg-surfaceDark">
      <BsArrowBarRight className="text-sm text-accentText dark:text-accentTextDark" />
      <p className="font-english text-xs text-mainText dark:text-mainTextDark">
        {spreadValue}
      </p>
      <BsArrowBarRight className="rotate-180 text-sm text-accentText dark:text-accentTextDark" />
    </div>
  );
}

export default Spread;
