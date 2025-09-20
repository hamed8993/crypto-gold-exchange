/* eslint-disable @typescript-eslint/ban-ts-comment */
import AlertBox from "@/components/atoms/alertBox";
import CustomButton from "@/components/atoms/customButton";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { RequestError } from "@/core/services/config";
import { usePostUser_dataActivate_2fa } from "@/core/services/hooks";
import { GetUserDataAccountDetails } from "@/core/services/types";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import ActivationLevelOne from "./components/activationLevelOne";
import ActivationLevelThree from "./components/activationLevelThree";
import ActivationLevelTwo from "./components/activationLevelTwo";
import { ActivateTFAContextProvider, useActivateTFAContext } from "./provider";

interface ActivationProps {
  refetch?: (
    options?: RefetchOptions,
  ) => Promise<
    QueryObserverResult<GetUserDataAccountDetails, RequestError | Error>
  >;
}

function ActivationComponent({ refetch }: ActivationProps) {
  const t = useTranslations();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { watch } = useActivateTFAContext();

  const { mutate, isPending } = usePostUser_dataActivate_2fa({
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
      refetch?.();
    },
    onError: (err) => {
      // @ts-ignore
      showError(getErrorMessages(err.message.error));
    },
  });
  const tfaCode = watch("tfaCode");
  const onSubmit = () => {
    mutate({
      requestBody: {
        tfaCode: tfaCode,
      },
    });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between px-3">
      <div className="mt-4 flex h-fit w-full flex-col items-start justify-start pb-8">
        <ActivationLevelOne />

        <ActivationLevelTwo />

        <ActivationLevelThree />

        <AlertBox data={[t("tfaHelp1"), t("tfaHelp2"), t("tfaHelp3")]} />
        <div className="flex h-10 w-2"></div>
      </div>
      <StickyComponent className="bg-mainBackground flex w-full px-3 py-3">
        <CustomButton
          className="bg-buttonPositive h-12 rounded-md"
          isLoading={isPending}
          isDisabled={tfaCode?.length > 0 ? false : true || isPending}
          onClick={onSubmit}
        >
          {t("activate")}
        </CustomButton>
      </StickyComponent>
    </div>
  );
}

const Activation = ({ ...props }: ActivationProps) => {
  return (
    <ActivateTFAContextProvider>
      <ActivationComponent {...props} />
    </ActivateTFAContextProvider>
  );
};

export default Activation;
