/* eslint-disable @typescript-eslint/ban-ts-comment */
import useUrl from "@/core/hooks/useUrl";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostLoginVerify2fa } from "@/core/services/hooks";
import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useLoginContext } from "../../../provider";

function ContinueButton() {
  const t = useTranslations();
  const { locale } = useUrl();

  const { handleSavingTokens } = useAuth();

  const { watch, handleSubmit } = useLoginContext();

  const { showError, showSuccess } = useNotification();
  const { getErrorMessages } = useGetAPIMessages();

  const [isManuallyLoading, setIsManuallyLoading] = useState<boolean>(false);

  const { mutate: mutateVerify2fa, isPending: isPendingVerify2fa } =
    usePostLoginVerify2fa({
      onSuccess: () => {
        showSuccess(t("loggedInSuccessfully"));
        handleSavingTokens({
          LT: "true",
        });
        setIsManuallyLoading(true);
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/`;
      },
      onError: (err) => {
        // @ts-ignore
        showError(getErrorMessages(err.message.error));
      },
    });

  const onSubmit = () => {
    handleSubmit(() =>
      mutateVerify2fa({
        requestBody: {
          tfaCode: watch("tfaCode"),
        },
      }),
    )();
  };

  return (
    <ButtonDefault
      onClick={onSubmit}
      isDisabled={isManuallyLoading || isPendingVerify2fa}
      isLoading={isManuallyLoading || isPendingVerify2fa}
      className="flex h-12! items-center justify-center px-6"
    >
      <p className="text-sm text-white">{t("continue")}</p>
    </ButtonDefault>
  );
}

export default ContinueButton;
