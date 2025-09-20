import { useTradeContext } from "@/components/pages/desktopTradePage/provider";
import { usePnl } from "@/core/hooks/usePnl";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import SizeInput from "../sizeInput";

interface ContractSizeBoxProps {
  symbol: string;
}

function ContractSizeBox({ symbol }: ContractSizeBoxProps) {
  const { setValue, watch } = useTradeContext();
  const contractSize = watch("contractSize");
  const { getMaxContractSize } = usePnl();
  const maxContractSize = getMaxContractSize(symbol);

  return (
    <div className="flex w-full items-center justify-between px-2">
      <div
        onClick={() => {
          const newValue = Number(contractSize) + 1;
          if (newValue < maxContractSize) {
            setValue("contractSize", newValue?.toString());
          }
        }}
        className="flex h-8 w-8 cursor-pointer items-center justify-center"
      >
        <GoPlus className="text-mainText text-lg" />
      </div>
      <SizeInput />
      <div
        onClick={() => {
          const newValue = Number(contractSize) - 1;
          if (newValue > 0) {
            setValue("contractSize", newValue?.toString());
          }
        }}
        className="flex h-8 w-8 cursor-pointer items-center justify-center"
      >
        <FiMinus className="text-mainText text-lg" />
      </div>
    </div>
  );
}

export default ContractSizeBox;
