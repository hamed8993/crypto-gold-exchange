import CustomInput from "@/components/atoms/customInput";
import { useTradeContext } from "@/components/pages/desktopTradePage/provider";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { addInputCommaSeparator } from "@/core/utilities/addInputCommaSeparator";

function SizeInput() {
  const { setValue, watch } = useTradeContext();
  const contractSize = watch("contractSize");

  return (
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
  );
}

export default SizeInput;
