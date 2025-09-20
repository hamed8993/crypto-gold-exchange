import CustomButton from "@/components/atoms/customButton";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetUser_dataGet_referral_codes,
  usePostUser_dataGenerate_ref_code,
} from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import NewReferralDetail from "../newReferralDetail";

function CreateReferralBox() {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();

  const { showError, showSuccess } = useNotification();
  const { getErrorMessages } = useGetAPIMessages();
  const { refetch } = useGetUser_dataGet_referral_codes({
    enabled: isLoggedIn,
  });

  const [value, setValue] = useState(0);
  const { mutate, isPending } = usePostUser_dataGenerate_ref_code({
    onSuccess: () => {
      showSuccess(t("referralAdded"));
      setValue(0);
      refetch();
    },
    onError: (error) => {
      showError(getErrorMessages(error));
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
    <div className="flex h-full w-fit items-center justify-between rounded-xl bg-surface p-4 dark:bg-surfaceDark">
      <div className="flex w-full flex-col items-center justify-start p-3 px-4">
        <p className="mb-3 mt-10 text-justify text-sm text-mainText dark:text-mainTextDark">
          {t("youCanChooseYourSubsetsShare")}
        </p>
        <NewReferralDetail setValue={setValue} value={value} />

        <CustomButton
          variant="primary"
          isLoading={isPending}
          isDisabled={isPending}
          className="mb-2 mt-10 flex items-center justify-center"
          onClick={generateReferralCode}
        >
          {t("createNewLinkButton")}
        </CustomButton>
      </div>
    </div>
  );
}

export default CreateReferralBox;
