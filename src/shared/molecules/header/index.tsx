"use client";

import HamburgerMenu from "@/components/atoms/svg/hamburgerMenu";
import { useAuth } from "@/core/providers/authProvider";
import { useWindowSize } from "@/core/providers/windowSize";
import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState } from "react";
import { PiWallet } from "react-icons/pi";
import AuthButtons from "./components/authButtons";
import NavigationLinks from "./components/navigationLinks";
import ProfileNotificationIcons from "./components/profileNotificationIcons";
import ResponsiveSidebar from "./components/responsiveSidebar";
import SwitchLanguage from "./components/switchLanguage";
import SwitchTheme from "./components/switchTheme";

function Header() {
  const t = useTranslations();
  const { width } = useWindowSize();
  const [isOpenResponsiveSidebar, setIsOpenResponsiveSidebar] =
    useState<boolean>(false);
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();

  return (
    <header className="bg-bgSurface sticky top-0 z-[11] mx-auto h-16 w-[720px] rounded-xl px-5 py-[6px] shadow-[2px_5px_0px_0px_var(--Neutral-15)] lg:w-fit lg:px-7">
      <nav className="flex h-full w-full gap-8 lg:hidden lg:w-fit lg:gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpenResponsiveSidebar(true)}
            >
              <HamburgerMenu color={theme === "dark" ? "#ffff" : "#1B264F"} />
            </button>
            {isLoggedIn && <ProfileNotificationIcons hasNotification={false} />}
          </div>
          <div className="flex items-center gap-2">
            <Image
              alt={t("logo")}
              src={"/assets/images/logo.png"}
              width={width > 1024 ? 32 : 26}
              height={width > 1024 ? 32 : 26}
            />
            <p className="text-textPrimary text-xl font-semibold lg:text-2xl">
              {t("goldfino")}
            </p>
          </div>
        </div>
        <ResponsiveSidebar
          isOpenResponsiveSidebar={isOpenResponsiveSidebar}
          setIsOpenResponsiveSidebar={setIsOpenResponsiveSidebar}
        />
      </nav>

      <nav className="hidden h-full w-full gap-8 lg:flex lg:w-fit lg:gap-10">
        <div className="flex w-full items-center gap-2">
          <Image
            alt={t("logo")}
            src={"/assets/images/logo.png"}
            width={width > 1024 ? 32 : 26}
            height={width > 1024 ? 32 : 26}
          />
          <p className="text-textPrimary text-2xl font-semibold">
            {t("goldfino")}
          </p>
        </div>
        <div className="bg-borderDefault my-auto inline h-10 w-px" />

        <NavigationLinks />

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <ButtonDefault
                href={"#"}
                className="h-10! w-[115px]!"
                variant="outline"
                icon={<PiWallet className="size-[40px]" />}
              >
                <span className="text-textPrimary text-sm font-semibold text-nowrap">
                  {t("portfolio")}
                </span>
              </ButtonDefault>
              <ProfileNotificationIcons hasNotification={false} />
            </div>
          ) : (
            <AuthButtons />
          )}
          <SwitchLanguage containerClassName="ps-4! border-borderDefault border-s" />
          <SwitchTheme hasScrolled={false} hasHeaderBg={false} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
