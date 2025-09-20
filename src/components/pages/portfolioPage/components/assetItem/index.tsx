import { ArrayElement } from "@/core/constants/constants";
import AssetTitle from "./components/assetTitle";
import ButtonsRow from "./components/buttonsRow";
import DetailsColumn from "./components/detailsColumn";
import PieBox from "./components/pieBox";

export type pieDataProps = {
  color: string;
  label: string;
  value: number;
};

type UserWallet = {
  coin: string;
  in_order: string;
  mainBalance: string;
  marginBalance: string;
  pendingWithdraw: string;
  pieData: Array<pieDataProps>;
  total: string;
}[];

interface AssetItemProps {
  item: ArrayElement<UserWallet>;
}

function AssetItem({ item }: AssetItemProps) {
  return (
    <div className="bg-surface mt-3 flex w-full flex-col gap-2 rounded-xl p-3 pb-2">
      <AssetTitle coin={item?.coin} />

      <PieBox pieData={item?.pieData} coin={item?.coin} />

      <div className="bg-accentText50 my-2 flex h-px w-full self-center" />

      <DetailsColumn
        coin={item?.coin}
        mainBalance={item?.mainBalance}
        marginBalance={item?.marginBalance}
        total={item?.total}
      />

      <ButtonsRow coin={item.coin} />
    </div>
  );
}

export default AssetItem;
