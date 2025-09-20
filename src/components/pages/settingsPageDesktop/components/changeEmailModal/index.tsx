import AlertBox from "@/components/atoms/alertBox";
import Modal from "@/components/atoms/customModal";
import CustomResend from "@/components/atoms/customResend";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  usePostUser_dataSend_change_email_code,
  usePostUser_dataVerify_change_email_code,
} from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import { useSettingsContextProvider } from "../../provider";
import CodeInput from "../codeInput";
import ConfirmButton from "../confirmButton";
import CurrentEmail from "../currentEmail";
import EmailInput from "../emailInput";

interface ChangeEmailModalProps {
  activeModal: string;
  setActiveModal: Dispatch<SetStateAction<"email" | "password" | "none">>;
}

function ChangeEmailModal({
  activeModal,
  setActiveModal,
}: ChangeEmailModalProps) {
  const t = useTranslations();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();
  const { watch } = useSettingsContextProvider();

  const [isOkToStart, setIsOkToStart] = useState<boolean>(false);
  const [isCodeSectionOpen, setIsCodeSectionOpen] = useState<boolean>(false);

  const { mutate: mutateChangeEmail, isPending: isPendingChangeEmail } =
    usePostUser_dataVerify_change_email_code({
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        showError(getErrorMessages(error.message, error));
      },
      onSuccess: (data) => {
        showSuccess(getSuccessMessages(data.result));
      },
    });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutateChangeEmail({
      requestBody: {
        code: watch("code"),
      },
    });
  };

  const { mutate } = usePostUser_dataSend_change_email_code({
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
      setIsCodeSectionOpen(true);
      setIsOkToStart(true);
    },
  });

  const sendEmailCodeHandler = () => {
    mutate({
      requestBody: {
        email: watch("email"),
      },
    });
  };

  return (
    <Modal
      isOpen={activeModal === "email"}
      onClose={() => setActiveModal("none")}
      title={t("changeEmail")}
    >
      <form
        className="flex w-full flex-col items-start justify-start"
        onSubmit={onSubmit}
      >
        <p className="text-accentText text-sm">{t("changeEmailDescription")}</p>
        <CurrentEmail />
        <EmailInput />
        <CustomResend
          isOkToStart={isOkToStart}
          onResend={sendEmailCodeHandler}
          setIsOkToStart={setIsOkToStart}
        />
        <CodeInput isCodeSectionOpen={isCodeSectionOpen} />
        <div className="flex h-4 min-h-4 w-2" />
        <AlertBox data={[t("email1")]} />
      </form>
      <ConfirmButton isPendingChangeEmail={isPendingChangeEmail} />
    </Modal>
  );
}

export default ChangeEmailModal;
