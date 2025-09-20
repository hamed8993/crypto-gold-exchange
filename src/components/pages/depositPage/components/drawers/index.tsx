import DepositHelpDrawer from "@/components/atoms/depositHelpDrawer";
import AddressDrawer from "../addressDrawer";
import SelectCoinDrawer from "../selectCoinDrawer";
import SelectNetworkDrawer from "../selectNetworkDrawer";

interface DrawersProps {
  isDisplayQrCode: boolean;
  isOpen: boolean;
  onClose: () => void;
}

function Drawers({ isDisplayQrCode, isOpen, onClose }: DrawersProps) {
  return (
    <>
      <AddressDrawer isDisplayQrCode={isDisplayQrCode} />
      <SelectCoinDrawer />
      <SelectNetworkDrawer />
      {isOpen && <DepositHelpDrawer isOpen={isOpen} onClose={onClose} />}
    </>
  );
}

export default Drawers;
