"use client";

import { localeType } from "@/app/[locale]/layout";
import SideDrawer from "@/components/atoms/sideDrawer";
import WalletInfo from "@/components/atoms/walletInfo";
import ChangeLanguageDrawer from "@/components/molecules/changeLanguageDrawer";
import { rtlLanguages } from "@/core/constants/constants";
import { useSideDrawer } from "@/core/hooks/useSideDrawer";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import {
  IoChevronBack,
  IoHelpCircleOutline,
  IoMenu,
  IoWalletOutline,
} from "react-icons/io5";
import Footer from "./components/footer";

interface PwaPageLayoutProps {
  backWrapperClassName?: string;
  children: ReactNode;
  containerClassName?: string;
  hasBackChevron?: boolean;
  hasFooter?: boolean;
  hasHeader?: boolean;
  hasLogo?: boolean;
  headerComponent?: ReactNode;
  isWalletOpen?: boolean;
  onBackClick?: () => void;
  onTitleIconClick?: () => void;
  sideComponent?: ReactNode;
  title?: ReactNode | string;
  titleHasIcon?: boolean;
  wrapperClassName?: string;
}

function PwaPageLayout({
  backWrapperClassName,
  children,
  containerClassName,
  hasBackChevron,
  hasFooter = true,
  hasHeader = true,
  headerComponent,
  isWalletOpen,
  sideComponent,
  onBackClick,
  onTitleIconClick,
  title,
  titleHasIcon,
  wrapperClassName,
}: PwaPageLayoutProps) {
  const { back } = useRouter();
  const { locale } = useUrl();

  const { isLoggedIn } = useAuth();

  const [isDisplayWallet, setIsDisplayWallet] = useState<boolean>(false);
  const [isLanguageDrawerOpen, setIsLanguageDrawerOpen] =
    useState<boolean>(false);

  const { isSideMenuOpen, setIsSideMenuOpen } = useSideDrawer();

  return (
    <div
      className={clsx(
        "relative mx-auto flex h-dvh min-h-dvh max-w-(--breakpoint-md) flex-col overflow-hidden bg-mainBackground dark:bg-mainBackgroundDark",
        wrapperClassName,
      )}
    >
      {hasHeader ? (
        headerComponent ? (
          headerComponent
        ) : (
          <header className="flex w-full flex-col items-center justify-start">
            <div className="flex min-h-14 w-full items-center justify-between overflow-visible bg-mainBackground px-4 dark:bg-mainBackgroundDark">
              {hasBackChevron ? (
                <div className={backWrapperClassName}>
                  <IoChevronBack
                    className={clsx(
                      "h-4 w-4 text-mainText dark:text-mainTextDark",
                      rtlLanguages.includes(locale as localeType)
                        ? "rotate-180"
                        : "",
                    )}
                    onClick={() => {
                      if (onBackClick) {
                        onBackClick?.();
                      } else {
                        back();
                      }
                    }}
                  />
                </div>
              ) : (
                <IoMenu
                  className="h-7 w-7 text-mainText dark:text-mainTextDark"
                  onClick={() => {
                    setIsSideMenuOpen(true);
                  }}
                />
              )}
              {typeof title === "string" ? (
                titleHasIcon ? (
                  <div className="flex items-center justify-start gap-1">
                    <p
                      className="text-lgs text-mainText dark:text-mainTextDark"
                      onClick={() => {}}
                    >
                      {title}
                    </p>
                    <IoHelpCircleOutline
                      onClick={onTitleIconClick}
                      className="mb-3 h-5 w-5 text-accentText dark:text-accentTextDark"
                    />
                  </div>
                ) : (
                  <p
                    className="text-lgs text-mainText dark:text-mainTextDark"
                    onClick={() => {}}
                  >
                    {title}
                  </p>
                )
              ) : (
                title
              )}
              {isLoggedIn ? (
                sideComponent || (
                  <IoWalletOutline
                    className="h-7 w-7 text-mainText dark:text-mainTextDark"
                    onClick={() => {
                      setIsDisplayWallet((prev) => !prev);
                    }}
                  />
                )
              ) : (
                <div className="w-7" />
              )}
            </div>
            {isDisplayWallet || isWalletOpen ? <WalletInfo /> : null}
          </header>
        )
      ) : null}

      <main
        className={clsx(
          "flex flex-1 flex-col overflow-auto bg-secondBackground dark:bg-secondBackgroundDark",
          containerClassName,
        )}
      >
        {children}
      </main>

      {hasFooter && (
        <footer className="sticky bottom-0 z-40 bg-mainBackground dark:bg-mainBackgroundDark">
          <Footer />
        </footer>
      )}
      {isSideMenuOpen && (
        <SideDrawer
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
          setIsLanguageDrawerOpen={setIsLanguageDrawerOpen}
        />
      )}

      {isLanguageDrawerOpen && (
        <ChangeLanguageDrawer
          isOpen={isLanguageDrawerOpen}
          onClose={() => {
            setIsLanguageDrawerOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default PwaPageLayout;
