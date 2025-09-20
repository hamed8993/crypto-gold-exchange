/* eslint-disable @typescript-eslint/ban-ts-comment */
import LoadingView from "@/components/atoms/loadingView";
import InputDesktop from "@/components/molecules/inputDesktop";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostRegisterSend_register_code } from "@/core/services/hooks";
import { CountdownTime } from "@/core/utilities/saveCountdownTime";
import { useTranslations } from "next-intl";
import { Controller, ControllerRenderProps } from "react-hook-form";
import { RegisterFormValues, useRegisterContext } from "../provider";

interface CodeSectionProps {
  count: number;
  isCounting: boolean;
  isLoading?: boolean;
  setStart: (state: boolean) => void;
}
const CodeSection = ({
  count,
  isCounting,
  isLoading,
  setStart,
}: CodeSectionProps) => {
  const t = useTranslations();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();
  // TODO: check after backend resend timeout
  const countdown = new CountdownTime("Register");

  const { control, watch, errors } = useRegisterContext();

  const { mutate, isPending: isLoadingResend } =
    usePostRegisterSend_register_code({
      onSuccess: (data) => {
        countdown.save();
        setStart(true);
        showSuccess(getSuccessMessages(data.result));
      },
      onError: (error) => {
        // @ts-ignore
        showError(getErrorMessages(error.message.error));
      },
    });

  const resend = () => {
    mutate({
      requestBody: {
        email: watch("email"),
      },
    });
  };

  const handleChange = (
    e: string,
    field: ControllerRenderProps<RegisterFormValues, "deviceCode">,
  ) => {
    if (/^\d*$/.test(e)) {
      field.onChange(e);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Controller
        control={control}
        name="deviceCode"
        render={({ field }) => (
          <InputDesktop
            {...field}
            onChange={(e) => handleChange(e, field)}
            error={errors?.deviceCode?.message}
            inputMode="numeric"
            isAmount={false}
            label={t("tfa6DigitCode")}
            labelContainerClassName="bg-surface "
            maxLength={6}
          />
        )}
        rules={{ required: { message: t("pleaseFillInput"), value: true } }}
      />

      <button
        type="button"
        className="text-positive flex h-10 items-center justify-end px-1 text-xs"
        disabled={isCounting || isLoading}
        onClick={resend}
      >
        {isLoading || isLoadingResend ? (
          <LoadingView
            wrapperClassName="min-h-[unset]"
            className="h-4! w-4! border-2!"
          />
        ) : isCounting ? (
          count
        ) : (
          t("resend")
        )}
      </button>
    </div>
  );
};

export default CodeSection;
