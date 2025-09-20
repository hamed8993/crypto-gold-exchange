import CustomSelect from "@/components/atoms/customSelect";
import { usePnl } from "@/core/hooks/usePnl";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LeverageItem from "../leverageItem";
import LeverageValue from "../leverageValue";
import TradeInput from "../tradeInput";

interface LeverageSelectProps {
  symbol: string;
}

function LeverageSelect({ symbol }: LeverageSelectProps) {
  const t = useTranslations();
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const { getLeverages } = usePnl();
  const leverages = getLeverages(symbol);

  return (
    <CustomSelect
      toggler={
        <TradeInput
          fieldName={"leverage"}
          label={t("leverage")}
          extraComponent={<LeverageValue />}
          className="bg-secondBackground h-[56px]! cursor-pointer justify-between rounded-[8px]! border-none"
        />
      }
      className="!bg-mainBackground border-none"
      childrenClassName="p-2 !bg-mainBackground "
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

export default LeverageSelect;
