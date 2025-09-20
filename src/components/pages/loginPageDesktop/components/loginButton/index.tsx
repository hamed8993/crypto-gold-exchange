/* eslint-disable @typescript-eslint/ban-ts-comment */
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import ButtonDefault from "@/shared/atoms/buttonDefault";
import { SHA256 } from "crypto-js";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  usePostLoginEmail_login,
  usePostLoginVerify2fa,
} from "@/core/services/hooks";
import { useLoginContext } from "../../provider";

function LoginButton() {
  const t = useTranslations();

  const { locale } = useUrl();

  const { handleSavingTokens } = useAuth();

  const { watch, handleSubmit, setValue } = useLoginContext();

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

  const { mutate, isPending } = usePostLoginEmail_login({
    onSuccess: (data) => {
      // @ts-ignore
      if (data.result?.tfaStatus === "on") {
        setValue("loginStep", "tfaInput");
      } else {
        mutateVerify2fa({
          requestBody: {
            tfaCode: "",
          },
        });
      }
    },
    onError: (error) => {
      // @ts-ignore
      showError(getErrorMessages(error.message.error));
    },
  });

  const onSubmit = () => {
    handleSubmit(() =>
      mutate({
        requestBody: {
          email: watch("email"),
          password: SHA256(watch("password")).toString(),
        },
      }),
    )();
  };

  return (
    <ButtonDefault
      onClick={onSubmit}
      isDisabled={isManuallyLoading || isPending || isPendingVerify2fa}
      isLoading={isManuallyLoading || isPending || isPendingVerify2fa}
      className="mt-8 h-12 w-[380px]!"
    >
      <p className="self-center text-sm text-white">{t("login")}</p>
    </ButtonDefault>
  );
}

export default LoginButton;
