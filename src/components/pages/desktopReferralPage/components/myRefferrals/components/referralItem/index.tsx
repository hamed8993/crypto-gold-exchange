import useUrl from "@/core/hooks/useUrl";
import { Dispatch, SetStateAction } from "react";
import HeaderBox from "../headerBox";

interface ReferralItemProps {
  index: number;
  code: number | string;
  income: number | string;
  subsetCount: number | string;
  referrerShare: number | string;
  subsetShare: number | string;
  setSelectedReferralItem: Dispatch<SetStateAction<number>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ReferralItem({
  index,
  code,
  income,
  referrerShare,
  subsetCount,
  subsetShare,
  setSelectedReferralItem,
  setIsOpen,
}: ReferralItemProps) {
  const { locale } = useUrl();

  const openModal = () => {
    setSelectedReferralItem(index);
    setIsOpen(true);
  };

  return (
    <div className="hover:bg-secondBackground mt-2 flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-3">
      <HeaderBox openModal={openModal} isEnglish title={index + 1} />
      <HeaderBox openModal={openModal} isEnglish title={code} />
      <HeaderBox openModal={openModal} isEnglish title={income} />
      <HeaderBox openModal={openModal} isEnglish title={subsetCount} />
      <HeaderBox
        openModal={openModal}
        className="hidden lg:flex"
        isEnglish
        title={`${referrerShare}%`}
      />
      <HeaderBox
        openModal={openModal}
        className="hidden lg:flex"
        isEnglish
        title={`${subsetShare}%`}
      />
      <HeaderBox
        className="z-50"
        isEnglish
        isLink
        title={`goldfino...${`${"https://dev.goldfino.com/"}${locale}/authentication/register?ref=${code}`.slice(-4)}`}
      />
    </div>
  );
}

export default ReferralItem;
