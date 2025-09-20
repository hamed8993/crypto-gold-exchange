"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/core/providers/authProvider";
import CustomButton from "@/components/atoms/customButton";

function LogoutButton() {
  const t = useTranslations();

  const { isLoggedIn, handleLogout, logoutIsLoading } = useAuth();

  return (
    isLoggedIn && (
      <CustomButton
        isLoading={logoutIsLoading}
        isDisabled={logoutIsLoading}
        onClick={handleLogout}
        className="mb-2 min-h-12 w-[calc(100%-16px)] bg-negative"
      >
        {t("logout")}
      </CustomButton>
    )
  );
}

export default LogoutButton;
