"use client";

import LoadingView from "@/components/atoms/loadingView";
import PwaPageLayout from "@/components/organisms/layout";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataAccount_details } from "@/core/services/hooks";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Activation from "./activation";
import DeActivation from "./deactivation";

interface TfaVerificationPageProps {
  className?: string;
}

function TfaVerificationPage({ className }: TfaVerificationPageProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();

  const {
    data: dataAccountDetails,
    isLoading: isLoadingAccountDetails,
    refetch: refetchAccountDetails,
  } = useGetUser_dataAccount_details({ enabled: isLoggedIn });

  const isTfaOn =
    dataAccountDetails?.result?.twoFactorAuthenticationStatus === "on";

  return (
    <PwaPageLayout
      wrapperClassName={clsx("pl-0 pr-0", className)}
      title={t("tfa")}
      hasFooter={false}
      hasBackChevron
    >
      {isLoadingAccountDetails ? (
        <LoadingView />
      ) : isTfaOn ? (
        <DeActivation refetch={refetchAccountDetails} />
      ) : (
        <Activation refetch={refetchAccountDetails} />
      )}
    </PwaPageLayout>
  );
}

export default TfaVerificationPage;
