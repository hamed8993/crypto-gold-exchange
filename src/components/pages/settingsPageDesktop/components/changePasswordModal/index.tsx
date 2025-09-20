import AlertBox from "@/components/atoms/alertBox";
import Modal from "@/components/atoms/customModal";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostUser_dataChange_password } from "@/core/services/hooks";
import { SHA256 } from "crypto-js";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { useSettingsContextProvider } from "../../provider";
import ConfirmButton from "../confirmButton";
import CurrentPasswordInput from "../currentPasswordInput";
import NewPasswordInput from "../newPasswordInput";
import PasswordConditionSection from "../passwordConditionSection";
import RepeatPasswordInput from "../repeatPasswordInput";

interface ChangePasswordModalProps {
  activeModal: string;
  setActiveModal: Dispatch<SetStateAction<"email" | "password" | "none">>;
  isPendingChangeEmail: boolean;
}

function ChangePasswordModal({
  activeModal,
  setActiveModal,
  isPendingChangeEmail,
}: ChangePasswordModalProps) {
  const { locale } = useUrl();
  const t = useTranslations();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();
  const { handleSubmit, watch } = useSettingsContextProvider();
  const { mutate: mutatePassword, isPending } = usePostUser_dataChange_password(
    {
      onSuccess: (data) => {
        showSuccess(getSuccessMessages(data.result));
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        showError(getErrorMessages(error.message, error));
      },
    },
  );

  const onPasswordSubmit = () => {
    mutatePassword({
      requestBody: {
        currentPassword: SHA256(watch("passwordCurrent")).toString(),
        newPassword: SHA256(watch("passwordNew")).toString(),
      },
    });
  };

  return (
    <Modal
      isOpen={activeModal === "password"}
      onClose={() => setActiveModal("none")}
      title={t("changePassword")}
      className="relative"
    >
      <form
        className="flex h-full w-full flex-col items-center justify-between overflow-y-auto px-3"
        onSubmit={handleSubmit(onPasswordSubmit)}
      >
        <div className="flex w-full flex-col overflow-y-auto pb-10">
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
      </form>
      <div className="bg-constantLight sticky bottom-0 rounded-md pt-2">
        <ConfirmButton
          containerClassName="pt-0!"
          isPendingChangeEmail={isPendingChangeEmail || isPending}
        />
      </div>
    </Modal>
  );
}

export default ChangePasswordModal;
