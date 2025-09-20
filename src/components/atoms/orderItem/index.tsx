import EntryPriceEditRow from "./components/entryPriceEditRow";
import PnlDate from "./components/pnlDate";
import SideLeverage from "./components/sideLeverage";
import TitleEditRow from "./components/titleEditRow";

interface OrderItemProps {
  symbol: string;
  totalSize: string;
  quote: string;
  base: string;
  entryPrice: string;
  side: string;
  created_at: string;
  onCancel: () => void;
  onEdit: () => void;
  leverage: string;
  totalMargin?: string;
  pnl?: string;
  closeTitle?: string;
  hasEdit?: boolean;
}

function OrderItem({
  symbol,
  onCancel,
  leverage,
  side,
  quote,
  totalSize,
  base,
  created_at,
  onEdit,
  entryPrice,
  totalMargin,
  pnl,
  closeTitle,
  hasEdit = true,
}: OrderItemProps) {
  return (
    <div className="mt-2 flex h-32 min-h-32 w-full flex-col items-center justify-start py-2 pb-5">
      <TitleEditRow
        base={base}
        closeTitle={closeTitle}
        onCancel={onCancel}
        pnl={pnl}
        quote={quote}
        symbol={symbol}
        totalSize={totalSize}
      />

      <SideLeverage leverage={leverage} side={side} />
      <EntryPriceEditRow
        entryPrice={entryPrice}
        hasEdit={hasEdit}
        onEdit={onEdit}
        quote={quote}
      />

      <PnlDate
        created_at={created_at}
        pnl={pnl}
        quote={quote}
        totalMargin={totalMargin}
      />

      <div className="my-2 w-full border-b border-b-accentText50 dark:border-b-accentTextDark50" />
    </div>
  );
}

export default OrderItem;
