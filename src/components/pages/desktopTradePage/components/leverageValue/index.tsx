import { IoIosArrowDown } from "react-icons/io";
import { useTradeContext } from "../../provider";

function LeverageValue() {
  const { watch } = useTradeContext();
  const leverage = watch("leverage");
  return (
    <div className="flex items-center justify-start gap-2">
      <IoIosArrowDown className="text-mainText min-h-4 min-w-4" />
      <p
        dir="ltr"
        className="font-english text-mainText w-fit min-w-fit text-sm"
      >
        {`${leverage}X`}
      </p>
    </div>
  );
}

export default LeverageValue;
