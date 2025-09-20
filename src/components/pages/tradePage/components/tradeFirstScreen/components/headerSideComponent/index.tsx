import { useAuth } from "@/core/providers/authProvider";
import { useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { TbDotsVertical } from "react-icons/tb";
import TradeSettingsSideDrawer from "../../../tradeFormScreen/components/tradeSettingSideDrawer";

interface HeaderSideComponentProps {
  symbol: string;
  onWalletClick: () => void;
}

function HeaderSideComponent({
  symbol,
  onWalletClick,
}: HeaderSideComponentProps) {
  const { isLoggedIn } = useAuth();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);

  return isLoggedIn ? (
    <div className="flex items-center justify-start gap-3">
      <IoWalletOutline
        className="text-mainText h-7 w-7"
        onClick={onWalletClick}
      />
      <TbDotsVertical
        className="text-mainText h-7 w-7"
        onClick={() => setIsSideMenuOpen(true)}
      />
      {isSideMenuOpen && (
        <TradeSettingsSideDrawer
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
          symbol={symbol}
        />
      )}
    </div>
  ) : (
    <div />
  );
}

export default HeaderSideComponent;
