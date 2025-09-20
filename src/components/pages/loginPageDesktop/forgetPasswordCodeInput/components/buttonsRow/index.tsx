import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostSecuritySend_password_reset_code } from "@/core/services/hooks";
import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import { useLoginContext } from "../../../provider";
import ContinueButton from "../continueButton";

function ButtonsRow() {
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
    <div className="mt-8 flex w-[444px] items-center justify-between">
      <ContinueButton />
      <ButtonDefault
        onClick={handleSubmit(sendCode)}
        isLoading={isPendingSendCode}
        isDisabled={isPendingSendCode}
        className="flex h-12! items-center justify-center bg-transparent px-6"
        variant="outline"
      >
        <p className="text-sm text-textPrimary">{t("resend")}</p>
      </ButtonDefault>
    </div>
  );
}

export default ButtonsRow;
