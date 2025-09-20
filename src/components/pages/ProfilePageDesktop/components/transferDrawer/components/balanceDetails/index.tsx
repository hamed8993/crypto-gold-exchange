import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";

interface BalanceDetailsProps {
  availableMain: string;
  asset?: string;
  title?: string;
}

function BalanceDetails({ asset, availableMain, title }: BalanceDetailsProps) {
  const { getQuoteName } = useMarketsNamesData();

  return (
    <div className="-mt-2 flex items-center justify-start gap-1 px-3">
      <p className="text-accentText text-xs">{title}:</p>
      <p className="font-english text-mainText text-xs">
        {addCommaSeparator(availableMain)}
      </p>
      <p className="text-accentText text-xs">{getQuoteName(asset || "")}</p>
    </div>
  );
}

export default BalanceDetails;
