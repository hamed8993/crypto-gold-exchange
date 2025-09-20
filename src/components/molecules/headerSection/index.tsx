import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import DropdownMenusComponent from "./DropdownMenusComponent";
import LanguageDropdown from "./LanguageDropdown";

interface HeaderBottomSectionProps {
  hasScrolled: boolean;
  hasHeaderBg?: boolean;
}

function HeaderSection({ hasScrolled, hasHeaderBg }: HeaderBottomSectionProps) {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();

  const { locale } = useUrl();

  const { isLoggedIn } = useAuth();

  const [dropdown, setDropdown] = useState<
    "discover" | "company" | "trading" | ""
  >("");

  const themeHandler = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="sticky left-0 top-0 z-20 w-screen">
      <div
        className={clsx(
          "h-20 w-full px-5 transition-colors duration-300",

          hasScrolled
            ? "bg-mainBackground shadow-md dark:bg-mainBackgroundDark"
            : hasHeaderBg
              ? "bg-[#0C111D]"
              : "bg-mainBackground dark:bg-mainBackgroundDark",
        )}
      >
        <div className="mx-auto flex h-full w-full flex-row-reverse items-center justify-between gap-8 xl:container md:flex-row">
          <Link href={`/${locale}/`} className="w-fit min-w-fit" prefetch>
            <Image
              alt="Goldfino logo"
              className="h-[50px] w-[60px]!"
              height={40}
              src="/assets/images/logo.png"
              width={40}
            />
          </Link>

          <DropdownMenusComponent
            dropdown={dropdown}
            hasScrolled={hasScrolled}
            hasHeaderBg={hasHeaderBg}
            setDropdown={setDropdown}
          />

          <div className="hidden w-full items-center justify-end gap-4 md:flex">
            <div className="flex items-center justify-center divide-x divide-accentText50 rtl:divide-x-reverse dark:divide-accentTextDark50">
              <div className="mx-auto flex h-full w-full items-center justify-end gap-4 xl:container">
                <Link
                  className="h-fit text-blue-500 hover:text-blue-400"
                  href={`/${locale}/${RoutesName.referral}`}
                  prefetch
                >
                  <p> {t("partnership")}</p>
                </Link>

                <LanguageDropdown
                  hasHeaderBg={hasHeaderBg}
                  hasScrolled={hasScrolled}
                />
              </div>

              <div
                className="flex h-10 w-10 items-center justify-center ps-4"
                onClick={themeHandler}
              >
                {theme === "light" ? (
                  <IoMoonOutline
                    className={clsx(
                      "scale-125",
                      hasHeaderBg && !hasScrolled
                        ? "text-mainTextDark dark:text-mainTextDark"
                        : "text-mainText dark:text-mainTextDark",
                    )}
                  />
                ) : (
                  <MdOutlineWbSunny
                    className={clsx(
                      "scale-125",
                      hasHeaderBg && !hasScrolled
                        ? "text-mainTextDark dark:text-mainTextDark"
                        : "text-mainText dark:text-mainTextDark",
                    )}
                  />
                )}
              </div>
            </div>

            {!isLoggedIn && (
              <Link
                className={clsx(
                  "h-fit hover:text-blue-400",
                  hasHeaderBg && !hasScrolled
                    ? "text-mainTextDark dark:text-mainTextDark"
                    : "text-mainText dark:text-mainTextDark",
                )}
                href={`/${locale}/authentication/login`}
                prefetch
              >
                <p> {t("login")}</p>
              </Link>
            )}

            {!isLoggedIn && (
              <Link
                className={clsx(
                  "h-fit rounded-lg px-3 py-2",
                  hasHeaderBg && !hasScrolled
                    ? "bg-mainBackground text-mainText dark:bg-mainBackgroundDark dark:text-mainTextDark"
                    : "bg-mainBackgroundDark text-mainTextDark dark:bg-mainBackground dark:text-mainText",
                )}
                href={`/${locale}/authentication/register`}
                prefetch
              >
                <p className="text-nowrap">{t("register")}</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
