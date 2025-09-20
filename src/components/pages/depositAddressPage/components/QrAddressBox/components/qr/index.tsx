import CustomDrawer from "@/components/atoms/customDrawer";
import { CustomQrCode } from "@/components/atoms/customQrCode";

interface QrProps {
  address?: string;
  logo: string;
  isOpen: boolean;
  onClose: () => void;
}

function Qr({ address, logo, isOpen, onClose }: QrProps) {
  return (
    <CustomDrawer
      isOpen={isOpen}
      onClose={onClose}
      hasCross={true}
      drawerClassName="flex flex-col justify-center items-center pb-6"
      height="fit-content"
    >
      <div className="flex my-2 mt-4 h-72 w-72 items-center justify-center rounded-xl bg-mainBackground p-6 dark:bg-mainBackgroundDark">
        <CustomQrCode
          bgColor={"#fff"}
          containerBorderRadius={10}
          eyeColor={"#000"}
          fgColor={"#000"}
          logo={logo}
          qrText={address}
        />
      </div>
    </CustomDrawer>
  );
}

export default Qr;
