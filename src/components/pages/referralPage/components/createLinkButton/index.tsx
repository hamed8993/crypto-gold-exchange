/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import CustomSlider from "@/components/atoms/customSlider";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetUser_dataGet_referral_codes,
  usePostUser_dataGenerate_ref_code,
} from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoLink } from "react-icons/io5";

function CreateLinkButton() {
  const t = useTranslations();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages } = useGetAPIMessages();

  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const { refetch } = useGetUser_dataGet_referral_codes({
    enabled: isLoggedIn,
  });

  function onClose() {
    setIsOpen(false);
  }

  function onOpen() {
    setIsOpen(true);
  }

  const { mutate } = usePostUser_dataGenerate_ref_code({
    onSuccess: () => {
      // @ts-ignore
      showSuccess(t("referralAdded"));
      onClose();
      refetch();
    },
    onError: (error) => {
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
      onClose();
      refetch();
    },
  });

  function generateReferralCode() {
    mutate({
      requestBody: {
        subset_share: 30 - value,
      },
    });
  }

  return (
    <div className="w-full px-3">
      <CustomButton
        variant="primary"
        className="mt-2 mb-2 flex h-12 items-center justify-center"
        onClick={onOpen}
      >
        <IoLink className="mx-1 text-xl text-white" />
        {t("createNewLink")}
      </CustomButton>
      <CustomDrawer
        isOpen={isOpen}
        hasCross={false}
        onClose={onClose}
        height="fit-content"
      >
        <div className="flex w-full flex-col items-center justify-start p-3 px-4">
          <div className="bg-accentText flex h-1 w-[40%]"></div>
          <p className="text-mainText mt-10 mb-3 text-justify text-sm">
            {t("youCanChooseYourSubsetsShare")}
          </p>
          <div className="mt-5 flex w-full items-center justify-between">
            <p className="text-accentText text-justify text-sm">
              {t("yourShareNewLink")}
            </p>
            <p className="font-english text-mainText text-justify text-base">
              {`${"%"} ${value}`}
            </p>
          </div>
          <div className="mt-3 mb-10 flex w-full items-center justify-between">
            <p className="text-accentText text-justify text-sm">
              {t("subsetShareNewLink")}
            </p>
            <p className="font-english text-mainText text-justify text-base">
              {`${"%"} ${30 - value}`}
            </p>
          </div>
          <div className="flex w-full items-center justify-center px-3">
            <CustomSlider
              dir="rtl"
              max={30}
              value={value}
              min={0}
              step={1}
              onChange={setValue}
            />
          </div>

          <CustomButton
            variant="primary"
            className="mt-10 mb-2 flex items-center justify-center"
            onClick={generateReferralCode}
          >
            {t("createNewLinkButton")}
          </CustomButton>
        </div>
      </CustomDrawer>
    </div>
  );
}

export default CreateLinkButton;
