/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomButton from "@/components/atoms/customButton";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { RequestError } from "@/core/services/config";
import { usePostUser_dataDeactivate_2fa } from "@/core/services/hooks";
import { GetUserDataAccountDetails } from "@/core/services/types";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import DeactivationLevelOne from "./components/deactivationLevelOne";
import {
  DeactivateTFAContextProvider,
  useDeactivateTFAContext,
} from "./provider";

interface DeActivationProps {
  refetch?: (
    options?: RefetchOptions,
  ) => Promise<
    QueryObserverResult<GetUserDataAccountDetails, RequestError | Error>
  >;
}

function DeActivationComponent({ refetch }: DeActivationProps) {
  const t = useTranslations();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { watch } = useDeactivateTFAContext();

  const { mutate: mutateDeactivate2fa, isPending: isPendingDeactivate2fa } =
    usePostUser_dataDeactivate_2fa({
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
    mutateDeactivate2fa({
      requestBody: {
        tfaCode: tfaCode,
      },
    });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between px-3">
      <div className="mt-4 flex h-fit w-full flex-col items-start justify-start">
        <DeactivationLevelOne />
      </div>
      <StickyComponent className="bg-mainBackground flex w-full px-3 py-3">
        <CustomButton
          className="bg-negative h-12 rounded-md"
          isLoading={isPendingDeactivate2fa}
          isDisabled={
            tfaCode?.length > 0 ? false : true || isPendingDeactivate2fa
          }
          onClick={onSubmit}
        >
          {t("deactivate")}
        </CustomButton>
      </StickyComponent>
    </div>
  );
}

const DeActivation = ({ ...props }: DeActivationProps) => {
  return (
    <DeactivateTFAContextProvider>
      <DeActivationComponent {...props} />
    </DeactivateTFAContextProvider>
  );
};

export default DeActivation;
