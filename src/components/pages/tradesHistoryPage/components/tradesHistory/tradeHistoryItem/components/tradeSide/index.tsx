import clsx from "clsx";
import { useTranslations } from "next-intl";

interface TradeSideProps {
  side: string;
}

function TradeSide({ side }: TradeSideProps) {
  const t = useTranslations();

  return (
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
  );
}

export default TradeSide;
