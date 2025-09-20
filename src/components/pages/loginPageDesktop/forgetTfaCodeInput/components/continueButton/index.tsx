/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostSecurityReset_2fa } from "@/core/services/hooks";
import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import { useLoginContext } from "../../../provider";

function ContinueButton() {
  const t = useTranslations();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();
  const { watch, handleSubmit } = useLoginContext();

  const { mutate: mutateReset2fa, isPending } = usePostSecurityReset_2fa({
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
    },
    onError: (error) => {
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
  });

  const onSubmit = () => {
    mutateReset2fa({
      requestBody: {
        email: watch("resetTfaEmail"),
        resetCode: watch("resetTfaCode"),
      },
    });
  };

  return (
    <ButtonDefault
      onClick={handleSubmit(onSubmit)}
      isDisabled={isPending}
      isLoading={isPending}
      className="flex h-12! items-center justify-center px-6"
    >
      <p className="text-sm text-white">{t("continue")}</p>
    </ButtonDefault>
  );
}

export default ContinueButton;
