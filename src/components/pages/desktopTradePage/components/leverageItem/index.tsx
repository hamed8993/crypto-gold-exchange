import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useTradeContext } from "../../provider";

interface LeverageItemProps {
  item: string;
  setIsSelectorOpen: Dispatch<SetStateAction<boolean>>;
}

function LeverageItem({ setIsSelectorOpen, item }: LeverageItemProps) {
  const { watch, setValue } = useTradeContext();
  const leverage = watch("leverage");
  return (
    <div
      onClick={() => {
        setValue("leverage", item);
        setIsSelectorOpen(false);
      }}
      className={clsx(
        "my-1 mt-2 flex w-full cursor-pointer items-center justify-between self-center! rounded-lg border px-2 py-3",
        leverage === item ? "border-accentText" : "border-border",
      )}
    >
      <p dir="ltr" className="font-english text-mainText text-xs">
        {`${item} X`}
      </p>
      {item === leverage ? (
        <IoCheckmarkOutline className="text-mainText h-5 w-5" />
      ) : null}
    </div>
  );
}

export default LeverageItem;
