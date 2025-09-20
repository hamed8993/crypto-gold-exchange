import { IoIosArrowUp } from "react-icons/io";
import { MarketListItemType } from "../market";
import MarketCellItem from "../marketCellItem";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";

interface MarketRowItemProps {
  value: MarketListItemType;
}

function MarketRowItem({ value }: MarketRowItemProps) {
  const isChangesPlus = (price: string) => {
    return Number(price) > 0;
  };

  return (
    <div className="hover:bg-bgMuted grid h-5 grid-cols-3 rounded-sm px-1">
      <MarketCellItem value={value} />

      <p className="font-english text-textPrimary dark:text-constantLight items-center justify-self-center text-xs font-normal">
        {addCommaSeparator((value?.last_price) || 0)}
      </p>

      <div className="flex items-center justify-end gap-1 justify-self-end">
        <p
          className={`font-english text-xs font-normal ${isChangesPlus(value?.change_price || "0") ? "text-textSuccess" : "text-textError"}`}
        >
          {addCommaSeparator(Math.abs(Number(value?.change_price || 0)))}
        </p>
        <IoIosArrowUp
          className={
            isChangesPlus(value?.change_price || "0")
              ? "text-textSuccess"
              : "text-textError rotate-180 transform"
          }
        />
      </div>
    </div>
  );
}

export default MarketRowItem;
