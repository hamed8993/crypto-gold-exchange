import LoadingView from "@/components/atoms/loadingView";
import { MarketListItemType } from "../market";
import NotFound from "../notfound";
import OrdersListHeader from "../ordersListHeader";

interface OrdersListProps {
  isLoading: boolean;
  dataList: MarketListItemType[];
}

function OrdersList({ isLoading, dataList }: OrdersListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingView />
      </div>
    );
  } else if (dataList?.length === 0) return <NotFound />;

  return (
    <div className="flex flex-col gap-3">
      <OrdersListHeader />
      <div className="flex flex-col gap-2">
        {/* {dataList?.map((item: MarketListItemType) => (
          <MarketRowItem key={item?.id} value={item} />
        ))} */}
      </div>
    </div>
  );
}

export default OrdersList;
