import CustomButton from "@/components/atoms/customButton";
import { useTranslations } from "next-intl";
import OrderTitle from "../orderTitle";

interface TitleEditRowProps {
  base: string;
  quote: string;
  symbol: string;
  totalSize: string;
  pnl?: string;
  closeTitle?: string;
  onCancel: () => void;
}

function TitleEditRow({
  base,
  closeTitle,
  pnl,
  quote,
  symbol,
  totalSize,
  onCancel,
}: TitleEditRowProps) {
  const t = useTranslations();
  return (
    <div className="flex w-full items-center justify-between">
      <OrderTitle
        base={base}
        quote={quote}
        symbol={symbol}
        totalSize={totalSize}
      />

      <CustomButton
        onClick={onCancel}
        variant="outlineNegative"
        className="-mb-2 h-7! min-h-7! w-28! rounded-md py-0!"
      >
        <p className="text-xs text-negative">
          {pnl
            ? closeTitle
              ? closeTitle
              : t("closePosition")
            : t("cancelOrder")}
        </p>
      </CustomButton>
    </div>
  );
}

export default TitleEditRow;
