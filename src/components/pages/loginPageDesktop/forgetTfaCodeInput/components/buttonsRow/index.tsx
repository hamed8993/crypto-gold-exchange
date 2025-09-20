import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostSecuritySend_2fa_reset_code } from "@/core/services/hooks";
import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import { useLoginContext } from "../../../provider";
import ContinueButton from "../continueButton";

function ButtonsRow() {
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
    <div className="mt-8 flex w-[444px] items-center justify-between">
      <ContinueButton />
      <ButtonDefault
        onClick={handleSubmit(sendEmailCodeHandler)}
        isLoading={isPending}
        isDisabled={isPending}
        className="flex h-12! items-center justify-center bg-transparent px-6"
        variant="outline"
      >
        <p className="text-sm text-textPrimary">{t("resend")}</p>
      </ButtonDefault>
    </div>
  );
}

export default ButtonsRow;
