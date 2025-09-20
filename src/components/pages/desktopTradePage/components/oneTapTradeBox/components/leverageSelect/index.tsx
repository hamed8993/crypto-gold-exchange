import CustomSelect from "@/components/atoms/customSelect";
import { useTradeContext } from "@/components/pages/desktopTradePage/provider";
import { usePnl } from "@/core/hooks/usePnl";
import { useState } from "react";
import LeverageItem from "../leverageItem";

interface LeverageSelectProps {
  symbol: string;
}

function LeverageSelectBox({ symbol }: LeverageSelectProps) {
  const { watch } = useTradeContext();
  const leverage = watch("leverage");
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const { getLeverages } = usePnl();
  const leverages = getLeverages(symbol);

  return (
    <CustomSelect
      toggler={
        <div className="flex h-8 w-8 items-center justify-center">
          <p className="font-english text-mainText text-sm">{leverage}X</p>
        </div>
      }
      className="!bg-mainBackground border-none"
      childrenClassName="!bg-mainBackground "
      isVisible={isSelectorOpen}
      setIsVisible={setIsSelectorOpen}
    >
      {leverages?.map((item: string, index: number) => {
        return (
          <LeverageItem
            item={item}
            setIsSelectorOpen={setIsSelectorOpen}
            key={index}
          />
        );
      })}
    </CustomSelect>
  );
}

export default LeverageSelectBox;
