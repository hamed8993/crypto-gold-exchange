import CustomButton from "@/components/atoms/customButton";
import CustomModal from "@/components/atoms/customModal";

import { useTranslations } from "next-intl";
import Image from "next/image";

interface SureLogoutDeviceModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  text: string;
  operation: () => void;
  isPendingApi?: boolean;
}

function SureLogoutDeviceModal({
  isModalOpen,
  setIsModalOpen,
  text,
  operation,
  isPendingApi,
}: SureLogoutDeviceModalProps) {
  const t = useTranslations();

  return (
    <CustomModal
      isOpen={isModalOpen}
      className="p-0!"
      onClose={() => setIsModalOpen(false)}
      title={""}
    >
      <div className="flex w-full flex-col items-center justify-start">
        <div className="bg-userChatBackground flex w-full items-center justify-center rounded-t-xl py-10">
          <Image
            alt="stopLoss"
            src={"/assets/images/stock.png"}
            width={150}
            height={150}
          />
        </div>
        <div className="bg-mainBackground -mt-5 flex w-[90%] items-center justify-center rounded-lg px-3 py-5">
          <p className="text-mainText text-sm">{text}</p>
        </div>
        <div className="mt-5 mb-6 flex h-28 w-full flex-col items-center justify-between px-5">
          <CustomButton
            isLoading={isPendingApi}
            isDisabled={isPendingApi}
            onClick={operation}
            variant="outline"
            className="flex h-12 w-full items-center justify-center rounded-md"
          >
            <p dir="rtl" className="text-positive text-justify text-xs">
              {t("confirm")}
            </p>
          </CustomButton>
          <CustomButton
            isDisabled={isPendingApi}
            onClick={() => setIsModalOpen(false)}
            variant="outlineNegative"
            className="flex h-12 w-full items-center justify-center rounded-md"
          >
            <p dir="rtl" className="text-negative text-justify text-xs">
              {t("cancel")}
            </p>
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
}

export default SureLogoutDeviceModal;
