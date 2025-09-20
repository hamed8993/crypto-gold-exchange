import CustomInput from "@/components/atoms/customInput";
import { useTradeContext } from "@/components/pages/tradePage/provider";
import { usePnl } from "@/core/hooks/usePnl";
import { useAuth } from "@/core/providers/authProvider";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { addInputCommaSeparator } from "@/core/utilities/addInputCommaSeparator";
import { FaMinus, FaPlus } from "react-icons/fa";

interface InputComponentProps {
  symbol: string;
}

function InputComponent({ symbol }: InputComponentProps) {
  const { isLoggedIn } = useAuth();
  const { getMaxContractSize } = usePnl();

  const { setValue, watch } = useTradeContext();

  const isOneTapTradeActive = watch("isOneTapTradeActive");
  const contractSize = watch("contractSize");
  const maxContractSize = getMaxContractSize(symbol);

  return (
    <>
      {isOneTapTradeActive && isLoggedIn ? (
        <div className="bg-surface absolute right-[calc(50%-56px)] -mb-px flex h-9! w-28 items-center justify-between self-end rounded-tl-md rounded-tr-md px-3">
          <FaPlus
            onClick={() => {
              const newValue = Number(contractSize) + 1;
              if (newValue < maxContractSize) {
                setValue("contractSize", newValue?.toString());
              }
            }}
            className="text-mainText text-lg"
          />
          <CustomInput
            inputMode="decimal"
            maxLength={15}
            placeholder="--,----"
            onChange={(e) => {
              setValue("contractSize", addInputCommaSeparator(e.target));
            }}
            value={addCommaSeparator(contractSize)}
            inputClassName="font-english border-none text-center! text-lg!"
          />
          <FaMinus
            onClick={() => {
              const newValue = Number(contractSize) - 1;
              if (newValue > 0) {
                setValue("contractSize", newValue?.toString());
              }
            }}
            className="text-mainText text-lg"
          />
        </div>
      ) : null}
    </>
  );
}

export default InputComponent;
