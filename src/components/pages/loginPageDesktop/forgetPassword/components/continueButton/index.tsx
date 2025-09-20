import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostSecuritySend_password_reset_code } from "@/core/services/hooks";
import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import { useLoginContext } from "../../../provider";

function ContinueButton() {
  const t = useTranslations();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();
  const { showError, showSuccess } = useNotification();

  const { watch, handleSubmit, setValue } = useLoginContext();

  const { mutate: mutateSendCode, isPending: isPendingSendCode } =
    usePostSecuritySend_password_reset_code({
      onSuccess: (data) => {
        showSuccess(getSuccessMessages(data.result));
        setValue("loginStep", "forgetPasswordCodeInput");
      },
      onError: (error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        showError(getErrorMessages(error.message.error));
      },
    });

  const sendCode = () => {
    mutateSendCode({
      requestBody: {
        email: watch("email"),
      },
    });
  };

  return (
    <ButtonDefault
      isLoading={isPendingSendCode}
      isDisabled={isPendingSendCode}
      onClick={handleSubmit(sendCode)}
      className="mt-8 h-12 w-[380px]!"
    >
      <p className="self-center text-sm text-white">{t("continue")}</p>
    </ButtonDefault>
  );
}

export default ContinueButton;
