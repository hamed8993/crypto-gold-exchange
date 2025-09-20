import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostSecuritySend_2fa_reset_code } from "@/core/services/hooks";
import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import { useLoginContext } from "../../../provider";

function SubmitButton() {
  const t = useTranslations();
  const { setValue, watch, handleSubmit } = useLoginContext();

  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { mutate, isPending } = usePostSecuritySend_2fa_reset_code({
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
      setValue("loginStep", "forgetTfaCodeInput");
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
  });

  const sendEmailCodeHandler = () => {
    mutate({
      requestBody: {
        email: watch("resetTfaEmail"),
      },
    });
  };

  return (
    <ButtonDefault
      isLoading={isPending}
      isDisabled={isPending}
      onClick={handleSubmit(sendEmailCodeHandler)}
      className="mt-8 h-12 w-[380px]!"
    >
      <p className="self-center text-sm text-white">{t("continue")}</p>
    </ButtonDefault>
  );
}

export default SubmitButton;
