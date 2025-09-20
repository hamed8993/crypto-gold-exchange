import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";

interface AssetDetailRowProps {
  coin: string;
  title: string;
  value: string | number;
}

function AssetDetailRow({ coin, title, value }: AssetDetailRowProps) {
  const { getQuoteName } = useMarketsNamesData();

  return (
    <div className="-mt-5 flex h-10 min-h-10 w-full items-center justify-between">
      <p className="text-accentText text-sm">{title}</p>
      <div className="flex items-center justify-start gap-1">
        <p className="font-english text-mainText text-sm">
          {addCommaSeparator(value)}
        </p>
        <p className="text-accentText text-sm">{getQuoteName(coin)}</p>
      </div>
    </div>
  );
}

export default AssetDetailRow;
