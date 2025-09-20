"use client";
import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import { usePostUser_dataVerify_change_email_code } from "@/core/services/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChangeEmailModal from "./components/changeEmailModal";
import ChangePasswordModal from "./components/changePasswordModal";
import SettingsGridBox from "./components/settinsGridBox";
import { SettingsContextProvider } from "./provider";

interface SettingsPageDesktopComponentProps {
  className?: string;
}

const SettingsPageDesktopComponent = ({
  className,
}: SettingsPageDesktopComponentProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeParam = searchParams.get("active");

  const [activeModal, setActiveModal] = useState<"email" | "password" | "none">(
    "none",
  );

  const { isPending: isPendingChangeEmail } =
    usePostUser_dataVerify_change_email_code();

  useEffect(() => {
    if (activeParam === "email") {
      setActiveModal("email");
    } else if (activeParam === "password") {
      setActiveModal("password");
    } else {
      setActiveModal("none");
    }
  }, [activeParam]);

  useEffect(() => {
    if (activeModal === "none") {
      router.replace(pathname);
    }
  }, [activeModal]);

  return (
    <DesktopPageLayout className={className} hasFooter hasHeader hasSideMenu>
      <SettingsGridBox />

      <ChangeEmailModal
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
      <ChangePasswordModal
        activeModal={activeModal}
        isPendingChangeEmail={isPendingChangeEmail}
        setActiveModal={setActiveModal}
      />
    </DesktopPageLayout>
  );
};

const SettingsPageDesktop = ({
  ...props
}: SettingsPageDesktopComponentProps) => {
  return (
    <SettingsContextProvider>
      <SettingsPageDesktopComponent {...props} />
    </SettingsContextProvider>
  );
};

export default SettingsPageDesktop;
