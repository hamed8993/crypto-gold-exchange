import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useAuth } from "@/core/providers/authProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostSecurityReset_password } from "@/core/services/hooks";
import ButtonDefault from "@/shared/atoms/buttonDefault";
import { SHA256 } from "crypto-js";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useLoginContext } from "../../../provider";

function ConfirmButton() {
  const t = useTranslations();
  const { locale } = useUrl();
  const { replace } = useRouter();
  const { handleSavingTokens } = useAuth();
  const { getErrorMessages } = useGetAPIMessages();
  const { showError, showSuccess } = useNotification();

  const { watch, handleSubmit } = useLoginContext();

  const { mutate, isPending } = usePostSecurityReset_password({
    onSuccess: () => {
      handleSavingTokens({
        LT: "true",
      });
      showSuccess(t("yourAccountHasBeenCreatedSuccessfully"));
      replace(`/${locale}${RoutesName.dashboard}`);
    },
    onError: (err) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showError(getErrorMessages(err.message.error));
    },
  });

  const onSubmit = () => {
    mutate({
      requestBody: {
        email: watch("forgetPasswordEmail"),
        newPassword: SHA256(watch("newPassword")).toString(),
        resetCode: watch("forgetPasswordCode"),
      },
    });
  };

  return (
    <ButtonDefault
      onClick={handleSubmit(onSubmit)}
      isDisabled={isPending}
      isLoading={isPending}
      className="mt-8 h-12 w-[380px]!"
    >
      <p className="self-center text-sm text-white">{t("continue")}</p>
    </ButtonDefault>
  );
}

export default ConfirmButton;
