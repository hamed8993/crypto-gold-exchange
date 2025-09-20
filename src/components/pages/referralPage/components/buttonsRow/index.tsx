import { IoShareSocialSharp } from "react-icons/io5";
import { LiaQrcodeSolid } from "react-icons/lia";
import { MdContentCopy } from "react-icons/md";

function ButtonsRow() {
  return (
    <div className="bg-surface mt-2 flex w-full items-center justify-between rounded-lg">
      <div className="flex h-14 w-full items-center justify-center">
        <IoShareSocialSharp className="text-mainBrand h-6 w-6" />
      </div>
      <div className="flex h-14 w-full items-center justify-center">
        <MdContentCopy className="text-mainBrand h-6 w-6" />
      </div>
      <div className="flex h-14 w-full items-center justify-center">
        <LiaQrcodeSolid className="text-mainBrand h-6 w-6" />
      </div>
    </div>
  );
}

export default ButtonsRow;
