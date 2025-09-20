"use client";

import CustomSwitch from "@/components/atoms/customSwitch";
import RowLink from "@/components/atoms/rowLink";
import PwaPageLayout from "@/components/organisms/layout";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import ChangeEmailPage from "./components/changeEmail";
import ChangePasswordPage from "./components/changePassword";
import LogoutButton from "./components/logoutButton";

interface SettingsPageProps {
  className?: string;
}

function SettingsPage({ className }: SettingsPageProps) {
  const t = useTranslations();
  const { locale } = useUrl();
  const { push } = useRouter();
  const { theme, setTheme } = useTheme();

  const searchParams = useSearchParams();
  const activeParam = searchParams.get("active");

  const [activePage, setActivePage] = useState<"email" | "password" | "none">(
    "none",
  );

  useEffect(() => {
    if (activeParam === "email") {
      setActivePage("email");
    } else if (activeParam === "password") {
      setActivePage("password");
    } else {
      setActivePage("none");
    }
  }, [activeParam]);

  const { isLoggedIn } = useAuth();

  const themeHandler = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return activePage === "email" ? (
    <ChangeEmailPage className={className} />
  ) : activePage === "password" ? (
    <ChangePasswordPage className={className} />
  ) : (
    <PwaPageLayout
      hasBackChevron
      // To prevent reverting language
      onBackClick={() => push(`/${locale}/`)}
      title={t("settings")}
      wrapperClassName={className}
    >
      <div className="mt-3 flex w-full flex-col items-center justify-start px-1">
        <div className="divide-y-border bg-surface mb-2 flex h-fit w-full flex-col divide-y rounded-md">
          {isLoggedIn && (
            <Fragment>
              <RowLink href={RoutesName.changeEmail} text={t("changeEmail")} />
              <RowLink
                href={RoutesName.changePassword}
                text={t("changePassword")}
              />
              <RowLink href={RoutesName.tfa} text={t("tfa")} />
            </Fragment>
          )}

          <div
            className="flex items-center justify-between px-2 py-1"
            onClick={themeHandler}
          >
            <div className="mx-2 flex items-center gap-2">
              <span className="text-mainText text-xs">{t("darkMode")}</span>
            </div>
            <span className="flex min-h-10 min-w-10 items-center justify-center">
              <CustomSwitch enabled={theme === "dark"} />
            </span>
          </div>

          {isLoggedIn && (
            <RowLink href={RoutesName.lastLogins} text={t("manageDevices")} />
          )}
        </div>
        <LogoutButton />
      </div>
    </PwaPageLayout>
  );
}
export default SettingsPage;
