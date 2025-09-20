import CustomDrawer from "@/components/atoms/customDrawer";
import QrBox from "../qrBox";
import AddressBox from "../addressBox";
import { useDepositContext } from "../../provider";

interface AddressDrawerProps {
  isDisplayQrCode: boolean;
}

function AddressDrawer({ isDisplayQrCode }: AddressDrawerProps) {
  const { watch, setValue } = useDepositContext();
  const generatedAddress = watch("generatedAddress");
  const isOpen = watch("isAddressDrawerOpen");

  const closeDrawer = () => {
    setValue("isAddressDrawerOpen", false);
  };
  return (
    <CustomDrawer
      isOpen={isOpen}
      onClose={closeDrawer}
      hasCross={false}
      height="fit-content"
    >
      <div className="flex h-full w-full flex-col items-center justify-start p-4">
        <QrBox address={generatedAddress} isDisplayQrCode={isDisplayQrCode} />

        <AddressBox
          address={generatedAddress}
          isDisplayQrCode={isDisplayQrCode}
        />
      </div>
    </CustomDrawer>
  );
}

export default AddressDrawer;
