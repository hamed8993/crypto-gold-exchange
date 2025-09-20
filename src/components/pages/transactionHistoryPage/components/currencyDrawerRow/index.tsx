import { ReactNode } from "react";
import { BiCheck } from "react-icons/bi";
import { IoChevronForward } from "react-icons/io5";
import { useTransactionsHistoryContext } from "../../provider";

interface CurrencyDrawerRowProps {
  coin: string;
  icon: ReactNode;
  onClose: () => void;
  symbol: string;
}

function CurrencyDrawerRow({
  coin,
  icon,
  onClose,
  symbol,
}: CurrencyDrawerRowProps) {
  const { setValue, watch } = useTransactionsHistoryContext();

  return (
    <div
      className="my-2 flex w-full items-center justify-between py-2 hover:cursor-pointer"
      onClick={() => {
        setValue("payment_currency", symbol);
        onClose();
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className={
            "flex min-h-8 min-w-8 items-center justify-center rounded-lg"
          }
        >
          {icon}
        </div>
        <div className="text-mainText mx-2 flex flex-col text-xs">
          <p className="text-mainText text-sm">{symbol}</p>
          <p className="text-accentText text-xs">{coin}</p>
        </div>
      </div>

      <div className="flex min-h-10 min-w-10 items-center justify-center">
        {watch("payment_currency") === symbol ? (
          <BiCheck className="text-mainText h-7 w-7" />
        ) : (
          <IoChevronForward className="text-accentText h-6 w-6 rtl:rotate-180" />
        )}
      </div>
    </div>
  );
}

export default CurrencyDrawerRow;
