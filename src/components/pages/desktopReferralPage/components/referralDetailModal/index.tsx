import Modal from "@/components/atoms/customModal";
import ReferralBackground from "@/components/atoms/svg/referralBackground";
import { ArrayElement } from "@/core/constants/constants";
import { Dispatch, SetStateAction } from "react";
import RefCode from "./components/refCode";
import RefDetailsBox from "./components/refDetailsBox";

interface ReferralDetailModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  item?: ArrayElement<
    {
      code: string;
      income: string;
      referrerShare: string;
      subsetCount: string;
      subsetShare: string;
    }[]
  >;
}

function ReferralDetailModal({
  isOpen,
  setIsOpen,
  item,
}: ReferralDetailModalProps) {
  return (
    <Modal isOpen={isOpen} className="p-0!" onClose={() => setIsOpen(false)}>
      <div className="flex w-full flex-col items-center justify-start">
        <div className="flex w-full items-center justify-center rounded-t-xl bg-userChatBackground py-5">
          <ReferralBackground size={170} />
        </div>
        <RefCode code={item?.code} />
        <RefDetailsBox item={item} />
      </div>
    </Modal>
  );
}

export default ReferralDetailModal;
