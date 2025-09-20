"use client";

import CustomButton from "@/components/atoms/customButton";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetUser_dataClaim_referral_rewards,
  useGetUser_dataGet_referral_codes,
} from "@/core/services/hooks";
import { useMutation } from "@tanstack/react-query";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import ReferralHistoryDrawer from "./ReferralHistoryDrawer";

function IncomeBox() {
  const t = useTranslations();
  const { showSuccess, showError } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  const { isLoggedIn } = useAuth();

  const { data } = useGetUser_dataGet_referral_codes({ enabled: isLoggedIn });
  const list = data?.result?.refCodes;
  const referralsCount = list?.reduce(
    (acc, curr) => Number(new Decimal(acc).add(Number(curr.subsetCount))),
    0,
  );
  const totalClaimed = data?.result?.totalClaimed || 0;
  const unclaimedBalance = data?.result?.unclaimedBalance || 0;

  const { mutate: referralMutate, isPending } = useMutation({
    mutationFn: useGetUser_dataClaim_referral_rewards.info().fun,
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data?.result));
    },
    onError: (error) => {
      showError(getErrorMessages(error as Error));
    },
  });

  const claim = () => {
    referralMutate();
  };

  return (
    <div className="flex w-full flex-col rounded-lg p-3">
      <div className="border-accentText50 flex w-full items-center justify-between rounded-xl border">
        <div className="flex h-24 w-[30%] flex-col items-center justify-center gap-4">
          <p className="text-accentText text-center text-xs">
            {t("totalIncome")}
          </p>
          <div className="flex items-center justify-start gap-1">
            <p className="font-english text-mainText text-sm">
              {`${totalClaimed}`}
            </p>
            <p className="text-accentText text-xs">{`${t("irtSymbol")}`}</p>
          </div>
        </div>
        <div className="flex h-24 w-[30%] flex-col items-center justify-center gap-4">
          <p className="text-accentText text-center text-xs">
            {t("totalReferralsCount")}
          </p>
          <div className="flex items-center justify-start gap-1">
            <p className="font-english text-mainText text-sm">
              {referralsCount}
            </p>
            <p className="text-accentText text-xs">{`${t("men")}`}</p>
          </div>
        </div>
        <div className="flex h-24 w-[30%] flex-col items-center justify-center gap-4">
          <p className="text-accentText text-center text-xs">
            {t("recievedMoney")}
          </p>
          <div className="flex items-center justify-start gap-1">
            <p className="font-english text-mainText text-sm">
              {`${unclaimedBalance}`}
            </p>
            <p className="text-accentText text-xs">{`${t("irtSymbol")}`}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex w-full items-center justify-between gap-2">
        <CustomButton
          className="!bg-mainBrandAlternative flex h-10 w-full items-center justify-center"
          variant="primary"
          onClick={() => setIsHistoryOpen(true)}
        >
          <MdOutlineHistoryToggleOff className="mx-1 text-base text-white" />
          {t("historyTitle")}
        </CustomButton>
        <CustomButton
          onClick={claim}
          isLoading={isPending}
          isDisabled={isPending}
          className="!bg-positive flex h-10 w-full items-center justify-center"
          variant="primary"
        >
          <GoPlusCircle className="mx-1 text-base text-white" />
          {t("addToWallet")}
        </CustomButton>
      </div>

      <ReferralHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
}

export default IncomeBox;
