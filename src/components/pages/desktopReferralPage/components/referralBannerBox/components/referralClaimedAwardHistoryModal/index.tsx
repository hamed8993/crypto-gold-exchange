import CustomModal from "@/components/atoms/customModal";
import EmptyView from "@/components/atoms/emptyView";
import LoadingView from "@/components/atoms/loadingView";
import TableDefault from "@/components/molecules/tableDefault";
import { ArrayElement } from "@/core/constants/constants";
import { useGetUser_dataClaim_referral_history } from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import { useTranslations } from "next-intl";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface ReferralClaimedAwardHistoryModalProps {
  showReferralHistoryModal: boolean;
  setShowReferralHistoryModal: Dispatch<SetStateAction<boolean>>;
}

interface ItemType {
  balanceBefore: string;
  balanceAfter: string;
  amount: string;
  time: string;
}

function ReferralClaimedAwardHistoryModal({
  showReferralHistoryModal,
  setShowReferralHistoryModal,
}: ReferralClaimedAwardHistoryModalProps) {
  const t = useTranslations();

  const { isPending } = useGetUser_dataClaim_referral_history();

  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();

  const fakeClaimedReferralAwardsList: ItemType[] = [
    {
      balanceBefore: "2061",
      balanceAfter: "4122",
      amount: "2061",
      time: "1711465982670",
    },
    {
      balanceBefore: "2061",
      balanceAfter: "4122",
      amount: "2061",
      time: "1711465982670",
    },
    {
      balanceBefore: "2061",
      balanceAfter: "4122",
      amount: "2061",
      time: "1711465982670",
    },
  ];

  const cols: {
    key: keyof ArrayElement<ItemType[]>;
    header: ReactNode;
    cell: (value: ArrayElement<ItemType[]>) => ReactNode;
  }[] = [
    {
      key: "balanceBefore",
      cell: (value) => (
        <p className="font-english text-mainText flex items-center justify-center py-2">
          {addCommaSeparator(value?.balanceBefore)}
        </p>
      ),
      header: t("balanceBeforeClaimReferral"),
    },
    {
      key: "balanceAfter",
      cell: (value) => (
        <p className="font-english text-mainText flex items-center justify-center py-2">
          {addCommaSeparator(value?.balanceAfter)}
        </p>
      ),
      header: t("balanceAfterClaimReferral"),
    },
    {
      key: "amount",
      cell: (value) => (
        <p className="py24 font-english text-mainText flex items-center justify-center">
          {addCommaSeparator(value?.amount)}
        </p>
      ),
      header: t("amount"),
    },
    {
      key: "time",
      cell: (value) => (
        <p className="font-english text-mainText flex items-center justify-center py-2">
          {convertMillisecondToLocal(value?.time).dateTime}
        </p>
      ),
      header: t("time"),
    },
  ];

  return (
    <CustomModal
      className="z-100 max-h-none! w-full max-w-6xl!"
      onClose={() => setShowReferralHistoryModal(false)}
      isOpen={showReferralHistoryModal}
    >
      <div className="bg-constantLight mt-4 h-full w-full flex-col rounded-xl p-3 pt-5">
        <p className="text-mainText mx-3 mt-4 mb-4 flex items-center self-start pb-4 text-justify text-base">
          {t("claimedReferralAwardHistoryTitle")}
        </p>
        {fakeClaimedReferralAwardsList?.length > 0 ? (
          isPending ? (
            <LoadingView />
          ) : (
            <TableDefault<ArrayElement<ItemType[]>>
              data={fakeClaimedReferralAwardsList}
              cols={cols}
              isLoading={isPending}
              hasDetails={false}
            />
          )
        ) : (
          <EmptyView />
        )}
      </div>
    </CustomModal>
  );
}

export default ReferralClaimedAwardHistoryModal;
