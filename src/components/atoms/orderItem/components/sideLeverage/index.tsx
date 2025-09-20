import clsx from "clsx";
import { useTranslations } from "next-intl";

interface SideLeverageProps {
  side: string;
  leverage: string;
}

function SideLeverage({ leverage, side }: SideLeverageProps) {
  const t = useTranslations();
  return (
    <div className="mt-2 flex w-full items-center justify-start gap-1">
      <div
        className={clsx(
          "flex items-center justify-center rounded-md p-1 px-3 opacity-70",
          side === "long" ? "bg-positive" : "bg-negative",
        )}
      >
        <p className="text-xs text-white">{t(side)}</p>
        <p className="text-xs text-white">{"-"}</p>
        <p className="text-xs text-white">{side?.toUpperCase()}</p>
      </div>
      <div
        className={
          "flex items-center justify-center rounded-md bg-mainBrandAlternative p-1 px-2 opacity-70"
        }
      >
        <p className="font-english text-xs text-white">{`  ${leverage}X  `}</p>
      </div>
    </div>
  );
}

export default SideLeverage;
