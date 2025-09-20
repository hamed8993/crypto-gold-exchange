import Decimal from "decimal.js";
import CustomButton from "../customButton";

interface BalancePercentageProps {
  balance?: string;
  onClick: (num: string) => void;
}

function BalancePercentage({ balance, onClick }: BalancePercentageProps) {
  const handlePercentage = (amount: number) => {
    return String(
      Decimal(Number(balance || 0))
        .times(amount)
        .floor(),
    );
  };

  return (
    <div className="flex w-full justify-between gap-2">
      <CustomButton
        onClick={() => onClick(handlePercentage(0.25))}
        variant="outline"
        className="focus:border px-3 font-english focus:border-mainBrand focus:text-mainBrand"
      >
        25%
      </CustomButton>
      <CustomButton
        onClick={() => onClick(handlePercentage(0.5))}
        variant="outline"
        className="focus:border px-3 font-english focus:border-mainBrand focus:text-mainBrand"
      >
        50%
      </CustomButton>
      <CustomButton
        onClick={() => onClick(handlePercentage(0.75))}
        variant="outline"
        className="focus:border px-3 font-english focus:border-mainBrand focus:text-mainBrand"
      >
        75%
      </CustomButton>
      <CustomButton
        onClick={() => onClick(handlePercentage(1))}
        variant="outline"
        className="focus:border px-3 font-english focus:border-mainBrand focus:text-mainBrand"
      >
        100%
      </CustomButton>
    </div>
  );
}

export default BalancePercentage;
