import CustomButton from "@/components/atoms/customButton";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { useGetUser_dataClaim_referral_rewards } from "@/core/services/hooks";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import ReferralClaimedAwardHistoryModal from "../referralClaimedAwardHistoryModal";

function TitleButtons() {
  const t = useTranslations();
  const { showSuccess, showError } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { mutate: referralMutate, isPending } = useMutation({
    mutationFn: useGetUser_dataClaim_referral_rewards.info().fun,
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data?.result));
    },
    onError: (error) => {
      showError(getErrorMessages(error as Error));
    },
  });

  const [showReferralHistoryModal, setShowReferralHistoryModal] =
    useState<boolean>(false);

  const claim = () => {
    referralMutate();
  };

  return (
    <>
      <div className="flex w-full min-w-fit flex-col items-start justify-start px-4">
        <div className="flex flex-col items-start justify-between py-2">
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-mainText text-[18px]">
              {t("referralDashboard1")}
            </p>
            <p className="text-mainText text-[18px]">
              {`${t("to2")} `}
              <span className="text-positive text-[22px]">
                {`${t("referralDashboard2")} `}
              </span>
              {t("irtSymbol")}
            </p>
          </div>
        </div>
        <div className="mt-4 flex w-[50%] items-center justify-start gap-2">
          <CustomButton
            className="!bg-mainBrandAlternative flex h-10 w-full min-w-fit items-center justify-center px-3"
            variant="primary"
            onClick={() => setShowReferralHistoryModal(true)}
          >
            <MdOutlineHistoryToggleOff className="mx-1 text-base text-white" />
            {t("historyTitle")}
          </CustomButton>
          <CustomButton
            onClick={claim}
            isLoading={isPending}
            isDisabled={isPending}
            className="!bg-positive flex h-10 w-full min-w-fit items-center justify-center px-3"
            variant="primary"
          >
            <GoPlusCircle className="mx-1 text-base text-white" />
            {t("addToWallet")}
          </CustomButton>
        </div>
      </div>
      {showReferralHistoryModal && (
        <ReferralClaimedAwardHistoryModal
          showReferralHistoryModal={showReferralHistoryModal}
          setShowReferralHistoryModal={setShowReferralHistoryModal}
        />
      )}
    </>
  );
}

export default TitleButtons;
