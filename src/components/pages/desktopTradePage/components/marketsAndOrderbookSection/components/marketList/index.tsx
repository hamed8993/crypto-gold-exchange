import LoadingView from "@/components/atoms/loadingView";
import { MarketListItemType } from "../market";
import MarketListHeader, {
  HeaderNameEnum,
  SortConfigType,
} from "../marketListHeader";
import MarketRowItem from "../marketRowItem";
import NotFound from "../notfound";

interface MarketListProps {
  isLoading: boolean;
  dataList: MarketListItemType[];
  sortConfig: SortConfigType;
  handleSort: (arg: HeaderNameEnum) => void;
}

function MarketList({
  dataList,
  isLoading,
  sortConfig,
  handleSort,
}: MarketListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingView />
      </div>
    );
  } else if (dataList?.length === 0) return <NotFound />;

  
  return (
    <div className="flex flex-col gap-3">
      <MarketListHeader sortConfig={sortConfig} handleSort={handleSort} />
      <div className="flex flex-col gap-2">
        {dataList?.map((item: MarketListItemType) => (
          <MarketRowItem key={item?.id} value={item} />
        ))}
      </div>
    </div>
  );
}

export default MarketList;
