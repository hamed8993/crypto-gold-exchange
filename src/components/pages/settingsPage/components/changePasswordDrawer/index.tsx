/* eslint-disable @typescript-eslint/ban-ts-comment */
import AlertBox from "@/components/atoms/alertBox";
import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import CustomLineInput from "@/components/atoms/customLineInput";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostUser_dataChange_password } from "@/core/services/hooks";
import { SHA256 } from "crypto-js";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import PasswordConditionSection from "./components/passwordConditionSection";
import {
  PasswordChangeContextProvider,
  usePasswordChangeContext,
} from "./provider";

interface ChangePasswordDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function ChangePasswordDrawerComponent({
  isOpen,
  onClose,
}: ChangePasswordDrawerProps) {
  const t = useTranslations();
  const { locale } = useUrl();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { control, handleSubmit, watch } = usePasswordChangeContext();

  const { mutate, isPending } = usePostUser_dataChange_password({
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
      onClose();
    },
    onError: (error) => {
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
  });

  const onSubmit = () => {
    mutate({
      requestBody: {
        currentPassword: SHA256(watch("passwordCurrent")).toString(),
        newPassword: SHA256(watch("passwordNew")).toString(),
      },
    });
  };

  const currentPassword = watch("passwordCurrent");
  const passwordNew = watch("passwordNew");
  const passwordRepeat = watch("passwordRepeat");

  return (
    <CustomDrawer isOpen={isOpen} onClose={onClose} height="100%">
      <form
        className="flex h-full w-full flex-col items-center justify-between px-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <p className="text-mainText text-lg">{t("changePassword")}</p>
          <p className="text-accentText mt-2 text-xs">
            {t("changePasswordDescription")}
          </p>
          <div className="mt-3 w-full space-y-5">
            <Controller
              control={control}
              name="passwordCurrent"
              render={({ field }) => (
                <CustomLineInput
                  {...field}
                  label={t("passwordCurrent")}
                  maxLength={100}
                  isSecured
                  type="password"
                  labelClassName={
                    currentPassword ? "!text-mainText " : "!text-accentText "
                  }
                  inputClassName={
                    currentPassword ? "!text-mainText " : "!text-accentText "
                  }
                  wrapperClassName="mb-4"
                />
              )}
              rules={{
                required: { message: t("pleaseFillInput"), value: true },
              }}
            />
            <Controller
              control={control}
              name="passwordNew"
              render={({ field }) => (
                <CustomLineInput
                  {...field}
                  label={t("passwordNew")}
                  autoComplete={"off"}
                  maxLength={100}
                  type="password"
                  labelClassName={
                    passwordNew ? "!text-mainText " : "!text-accentText "
                  }
                  inputClassName={
                    passwordNew ? "!text-mainText " : "!text-accentText "
                  }
                  wrapperClassName="mb-4"
                />
              )}
              rules={{
                required: { message: t("pleaseFillInput"), value: true },
              }}
            />

            <PasswordConditionSection password={watch("passwordNew")} />

            <Controller
              control={control}
              name="passwordRepeat"
              render={({ field }) => (
                <CustomLineInput
                  {...field}
                  label={t("passwordNewRepeat")}
                  autoComplete={"off"}
                  maxLength={100}
                  type="password"
                  labelClassName={
                    passwordRepeat ? "!text-mainText " : "!text-accentText "
                  }
                  inputClassName={
                    passwordRepeat ? "!text-mainText " : "!text-accentText "
                  }
                  wrapperClassName="mb-4"
                />
              )}
              rules={{
                required: { message: t("pleaseFillInput"), value: true },
                validate: {
                  matchesPassword: (value) =>
                    value === watch("passwordNew") || t("passwordsDoNotMatch"),
                },
              }}
            />
            <div className="flex h-3 w-2"> </div>
            <AlertBox
              wrapperClassName="mt-3"
              data={[
                t("changePassword1"),
                t("changePassword2"),
                t("changePassword3"),
              ]}
              linkData={[
                {
                  href: `/${locale}/${RoutesName.tfa}`,
                  text: t("activateTfa"),
                },
              ]}
            />
          </div>
        </div>
        <StickyComponent className="bg-secondBackground flex w-full px-3 pt-3">
          <div className="w-full py-4">
            <CustomButton isLoading={isPending}>{t("confirm")}</CustomButton>
          </div>
        </StickyComponent>
      </form>
    </CustomDrawer>
  );
}

function ChangePasswordDrawer({ ...props }: ChangePasswordDrawerProps) {
  return (
    <PasswordChangeContextProvider>
      <ChangePasswordDrawerComponent {...props} />
    </PasswordChangeContextProvider>
  );
}
export default ChangePasswordDrawer;
