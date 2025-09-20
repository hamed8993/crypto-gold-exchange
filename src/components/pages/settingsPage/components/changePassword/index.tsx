"use client";

import AlertBox from "@/components/atoms/alertBox";
import PwaPageLayout from "@/components/organisms/layout";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostUser_dataChange_password } from "@/core/services/hooks";
import { SHA256 } from "crypto-js";
import { useTranslations } from "next-intl";
import ConfirmButton from "./components/confirmButton";
import CurrentPasswordInput from "./components/currentPasswordInput";
import NewPasswordInput from "./components/newPasswordInput";
import PasswordConditionSection from "./components/passwordConditionSection";
import RepeatPasswordInput from "./components/repeatPasswordInput";
import {
  PasswordChangeContextProvider,
  usePasswordChangeContext,
} from "./provider";

interface ChangePasswordPageProps {
  className?: string;
}

function Component({ className }: ChangePasswordPageProps) {
  const t = useTranslations();
  const { locale } = useUrl();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { handleSubmit, watch } = usePasswordChangeContext();

  const { mutate, isPending } = usePostUser_dataChange_password({
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
  });

  const onSubmit = () => {
    mutate({
      requestBody: {
        currentPassword: SHA256(watch("passwordCurrent")).toString(),
        newPassword: SHA256(watch("passwordNew")).toString(),
      },
    });
  };

  return (
    <PwaPageLayout
      hasBackChevron
      hasFooter={false}
      title={t("changePassword")}
      wrapperClassName={className}
    >
      <form
        className="flex h-full w-full flex-col items-center justify-between overflow-y-auto px-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col overflow-y-auto pb-20">
          <p className="text-accentText mt-4 text-xs">
            {t("changePasswordDescription")}
          </p>
          <div className="mt-3 w-full space-y-5">
            <CurrentPasswordInput />

            <NewPasswordInput />

            <PasswordConditionSection password={watch("passwordNew")} />

            <RepeatPasswordInput />

            <div className="flex h-3 w-2"> </div>
            <AlertBox
              data={[
                t("changePassword1"),
                t("changePassword2"),
                t("changePassword3"),
              ]}
              linkData={[
                {
                  href: `/${locale}/${RoutesName.tfa}`,
                  text: t("activateTfa"),
                },
              ]}
              wrapperClassName="mt-3"
            />
          </div>
        </div>
        <ConfirmButton isPending={isPending} />
      </form>
    </PwaPageLayout>
  );
}

function ChangePasswordPage({ ...props }: ChangePasswordPageProps) {
  return (
    <PasswordChangeContextProvider>
      <Component {...props} />
    </PasswordChangeContextProvider>
  );
}

export default ChangePasswordPage;
