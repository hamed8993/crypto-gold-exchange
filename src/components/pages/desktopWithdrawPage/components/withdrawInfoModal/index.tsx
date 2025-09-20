import CustomModal from "@/components/atoms/customModal";
import { Dispatch, SetStateAction } from "react";
import WithdrawDetailsModal from "../withdrawDetailsModal";
import WithdrawModalButtons from "../withdrawModalButtons";

interface WithdrawInfoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function WithdrawInfoModal({
  isModalOpen,
  setIsModalOpen,
}: WithdrawInfoModalProps) {
  return (
    <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="flex w-full flex-col items-center justify-between pb-4">
        <WithdrawDetailsModal />
        <WithdrawModalButtons setIsModalOpen={setIsModalOpen} />
      </div>
    </CustomModal>
  );
}

export default WithdrawInfoModal;
