import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { MarketListItemType } from "../market";

interface OrderRowItemProps {
  value: MarketListItemType;
}

function OrderRowItem({ value }: OrderRowItemProps) {
  const isChangesPlus = (price: string) => {
    return Number(price) > 0;
  };

  return (
    <div className="hover:bg-bgMuted grid h-5 grid-cols-3 rounded-sm px-1">
      <p
        className={`font-english text-xs font-normal ${isChangesPlus(value?.change_price || "0") ? "text-textSuccess" : "text-textError"}`}
      >
        {addCommaSeparator(Math.abs(Number(value?.change_price || 0)))}
      </p>

      <p className="font-english text-textPrimary dark:text-constantLight items-center justify-self-center text-xs font-normal">
        {addCommaSeparator(value?.last_price || 0)}
      </p>

      <p
        className="font-english text-xs font-normal"
      >
        {addCommaSeparator(Math.abs(Number(value?.change_price || 0)))}
      </p>
    </div>
  );
}

export default OrderRowItem;
