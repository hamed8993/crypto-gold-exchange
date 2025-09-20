import { useState } from "react";
import ArrowBox from "./components/arrowBox";
import BalanceDetailsView from "./components/balanceDetailsView";
import BalanceTopLeftBox from "./components/balanceTopLeftBox";
import BalanceTopRightBox from "./components/balanceTopRightBox";

function BalanceBox() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <div className="mb-4 flex w-full flex-col items-start justify-start self-center bg-mainBackground dark:bg-mainBackgroundDark">
      <div className="flex w-full max-w-full items-center justify-between">
        <BalanceTopRightBox />
        <BalanceTopLeftBox />
      </div>

      <BalanceDetailsView isDrawerOpen={isDrawerOpen} />
      <ArrowBox
        isDrawerOpen={isDrawerOpen}
        onClick={() => {
          setIsDrawerOpen((prev) => !prev);
        }}
      />
    </div>
  );
}

export default BalanceBox;
