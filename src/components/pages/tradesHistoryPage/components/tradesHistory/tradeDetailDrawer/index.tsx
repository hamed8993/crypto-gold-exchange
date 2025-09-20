import { DrawerPage } from "@/components/atoms/drawerPage";
import type { SubPositionsItem } from "@/components/pages/openPositionsPage/components/editPosition";
import { ArrayElement } from "@/core/constants/constants";
import { GetHistoryPositions } from "@/core/services/types";
import Header from "./header";
import OpenCloseBox from "./openCloseBox";

interface TradeDetailDrawerProps {
  isOpen: boolean;
  item?: ArrayElement<GetHistoryPositions["result"]>;
  onClose: () => void;
}

function TradeDetailDrawer({ isOpen, onClose, item }: TradeDetailDrawerProps) {
  return (
    <DrawerPage
      drawerClassName="h-full w-full flex pr-0 pl-0"
      hasCross={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Header onClick={onClose} />

      {item?.subPositions?.map((item: SubPositionsItem, index: number) => {
        return <OpenCloseBox item={item} key={index} />;
      })}
    </DrawerPage>
  );
}

export default TradeDetailDrawer;
