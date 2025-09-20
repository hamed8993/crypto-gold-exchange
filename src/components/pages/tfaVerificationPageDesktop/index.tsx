"use client";

import LoadingView from "@/components/atoms/loadingView";
import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataAccount_details } from "@/core/services/hooks";
import Activation from "./activation";
import DeActivation from "./deactivation";

interface TfaVerificationPageDesktopProps {
  className?: string;
}

const TfaVerificationPageDesktop = ({
  className,
}: TfaVerificationPageDesktopProps) => {
  const { isLoggedIn } = useAuth();

  const {
    data: dataAccountDetails,
    isLoading: isLoadingAccountDetails,
    refetch: refetchAccountDetails,
  } = useGetUser_dataAccount_details({ enabled: isLoggedIn });

  const isTfaOn =
    dataAccountDetails?.result?.twoFactorAuthenticationStatus === "on";

  return (
    <DesktopPageLayout className={className} hasFooter hasHeader hasSideMenu>
      {isLoadingAccountDetails ? (
        <LoadingView />
      ) : isTfaOn ? (
        <DeActivation refetch={refetchAccountDetails} />
      ) : (
        <Activation refetch={refetchAccountDetails} />
      )}
    </DesktopPageLayout>
  );
};

export default TfaVerificationPageDesktop;
