import { localeType } from "@/app/[locale]/layout";
import { rtlLanguages } from "@/core/constants/constants";
import { RoutesName } from "@/core/constants/routes";
import { useSideDrawer } from "@/core/hooks/useSideDrawer";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import { motion, useAnimation } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect } from "react";
import { BsPeople } from "react-icons/bs";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { IoEarthOutline, IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineAccountBalance,
  MdOutlineDataset,
  MdOutlineHeadphones,
  MdOutlineHelpOutline,
} from "react-icons/md";
import { RiScales3Line, RiSwap3Line } from "react-icons/ri";
import { TbHistory } from "react-icons/tb";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  setIsLanguageDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const SideDrawer = ({
  isOpen,
  onClose,
  setIsLanguageDrawerOpen,
}: DrawerProps) => {
  const t = useTranslations();
  const { locale } = useUrl();

  const { handleLogout, isLoggedIn } = useAuth();

  const controls = useAnimation();

  const { setIsSideMenuOpen } = useSideDrawer();

  useEffect(() => {
    if (isOpen) {
      controls.start("open");
    } else {
      controls.start("closed");
    }
  }, [isOpen, controls]);

  return (
    <div
      className="pointer-events-auto absolute inset-0 z-40 bg-black bg-opacity-50"
      onClick={(e) => {
        e.stopPropagation();
        setIsSideMenuOpen(false);
      }}
    >
      <motion.div
        animate={controls}
        dir="ltr"
        className="absolute z-50 h-full w-[280px] overflow-y-auto bg-surface shadow-lg xs:w-72 dark:bg-surfaceDark"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        exit="closed"
        initial="closed"
        dragElastic={
          rtlLanguages.includes(locale as localeType)
            ? { left: 0, right: 1 }
            : { left: 1, right: 0 }
        }
        onDragEnd={(_, info) => {
          if (info.offset.x > 100) {
            onClose();
          }
        }}
        onDrag={(e) => {
          e.preventDefault();
        }}
        style={{
          top: 0,
          left: 0,
          right: 0,
        }}
        transition={{ type: "tween", duration: 0.3 }}
        variants={
          rtlLanguages.includes(locale as localeType)
            ? {
                open: { x: 0 },
                closed: { x: 320 },
              }
            : {
                open: { x: 0 },
                closed: { x: -320 },
              }
        }
        onClick={(e) => {
          e.stopPropagation();
          setIsSideMenuOpen(false);
        }}
      >
        <div>
          <div className="bg-red flex w-full flex-col items-center justify-start p-3 pb-5">
            <div className="flex w-full items-center justify-end gap-2">
              <div className="flex flex-col items-end justify-start gap-1">
                <p className="text-base text-mainText dark:text-mainTextDark">
                  {t("goldfino")}
                </p>
                <p className="font-english text-[10px] text-accentText dark:text-accentTextDark">
                  goldfino.com™ | V0.0.1
                </p>
              </div>
              <div className="flex items-center justify-center rounded-lg bg-secondBackground p-2 dark:bg-secondBackgroundDark">
                <Image
                  alt="logo"
                  height={32}
                  src={"/assets/images/logo.png"}
                  width={32}
                />
              </div>
            </div>
          </div>

          <ul className="space-y-2">
            {isLoggedIn ? null : (
              <li className="mt-0!">
                <Link
                  className="flex min-h-14 w-full items-center justify-end p-4"
                  href={`/${locale}/${RoutesName.login}`}
                  prefetch
                >
                  <div className="flex items-center justify-end gap-4">
                    <p className="text-[13px] text-mainText dark:text-mainTextDark">
                      {t("login")} | {t("register")}
                    </p>
                    <IoIosLogIn className="rotate-180 scale-150 text-positive dark:text-positiveDark" />
                  </div>
                </Link>
                <div className="mx-auto h-px w-[94%] bg-accentText50 dark:bg-accentTextDark50" />
              </li>
            )}
            {isLoggedIn && (
              <li className="mt-0!">
                <Link
                  className="flex min-h-14 w-full items-center justify-end p-4"
                  href={`/${locale}/${RoutesName.profile}`}
                  prefetch
                >
                  <div className="flex items-center justify-end gap-4">
                    <p className="text-[13px] text-mainText dark:text-mainTextDark">
                      {t("myAccount")}
                    </p>
                    <MdOutlineAccountBalance className="scale-150 text-accentText dark:text-accentTextDark" />
                  </div>
                </Link>
                <div className="mx-auto h-px w-[94%] bg-accentText50 dark:bg-accentTextDark50" />
              </li>
            )}

            <li className="mt-0!">
              <Link
                className="flex min-h-14 w-full items-center justify-end p-4"
                href={`/${locale}/${RoutesName.settings}`}
                prefetch
              >
                <div className="flex items-center justify-end gap-4">
                  <p className="text-[13px] text-mainText dark:text-mainTextDark">
                    {t("settings")}
                  </p>
                  <IoSettingsOutline className="scale-150 text-accentText dark:text-accentTextDark" />
                </div>
              </Link>
              <div className="mx-auto h-px w-[95%] bg-accentText50 dark:bg-accentTextDark50" />
            </li>

            {isLoggedIn && (
              <li className="mt-0!">
                <Link
                  href={`/${locale}/${RoutesName.ordersHistory}`}
                  className="flex min-h-14 w-full items-center justify-end p-4"
                  prefetch
                >
                  <div className="flex items-center justify-end gap-4">
                    <p className="text-[13px] text-mainText dark:text-mainTextDark">
                      {t("accountHistory")}
                    </p>
                    <TbHistory className="scale-150 text-accentText dark:text-accentTextDark" />
                  </div>
                </Link>
                <div className="mx-auto h-px w-[95%] bg-accentText50 dark:bg-accentTextDark50" />
              </li>
            )}

            <li className="mt-0!">
              <Link
                href={
                  isLoggedIn
                    ? `/${locale}/${RoutesName.referral}`
                    : `/${locale}/${RoutesName.login}`
                }
                className="flex min-h-14 w-full items-center justify-end p-4"
                prefetch
              >
                <div className="flex items-center justify-end gap-3">
                  <p className="text-[13px] text-mainText dark:text-mainTextDark">
                    {t("referFriend")}
                  </p>
                  <BsPeople className="scale-150 text-accentText dark:text-accentTextDark" />
                </div>
              </Link>
              <div className="mx-auto h-px w-[95%] bg-accentText50 dark:bg-accentTextDark50" />
            </li>

            <li className="mt-0!">
              <div
                className="flex min-h-14 w-full items-center justify-end p-4"
                onClick={() => setIsLanguageDrawerOpen(true)}
              >
                <div className="flex items-center justify-end gap-3">
                  <p className="text-[13px] text-mainText dark:text-mainTextDark">
                    {t("language")}
                  </p>
                  <IoEarthOutline className="scale-150 text-accentText dark:text-accentTextDark" />
                </div>
              </div>
              <div className="mx-auto h-px w-[95%] bg-accentText50 dark:bg-accentTextDark50" />
            </li>

            <li className="mt-0!">
              <div
                onClick={() => {
                  window?.open(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/chat`,
                    "targetWindow",
                    `toolbar=no,
                      location=no,
                      status=no,
                      menubar=no,
                      scrollbars=yes,
                      resizable=yes,
                      width=450px,
                      height=800px`,
                  );
                  close?.();
                }}
                className="flex min-h-14 w-full items-center justify-end p-4"
              >
                <div className="flex items-center justify-end gap-4">
                  <p className="text-[13px] text-mainText dark:text-mainTextDark">
                    {t("support")}
                  </p>
                  <MdOutlineHeadphones className="scale-150 text-accentText dark:text-accentTextDark" />
                </div>
              </div>
              <div className="mx-auto h-px w-[95%] bg-accentText50 dark:bg-accentTextDark50" />
            </li>

            <li className="mt-0!">
              <Link
                href={`/${locale}/${RoutesName.help}`}
                className="flex min-h-14 w-full items-center justify-end p-4"
                prefetch
              >
                <div className="flex items-center justify-end gap-4">
                  <p className="text-[13px] text-mainText dark:text-mainTextDark">
                    {t("helpCenter")}
                  </p>
                  <MdOutlineHelpOutline className="scale-150 text-accentText dark:text-accentTextDark" />
                </div>
              </Link>
              <div className="mx-auto h-px w-[95%] bg-accentText50 dark:bg-accentTextDark50" />
            </li>

            <li className="mt-0!">
              <Link
                href="#"
                className="flex min-h-14 w-full items-center justify-end p-4"
                prefetch
              >
                <div className="flex items-center justify-end gap-4">
                  <p className="text-[13px] text-mainText dark:text-mainTextDark">
                    {t("about")}
                  </p>
                  <MdOutlineDataset className="scale-150 text-accentText dark:text-accentTextDark" />
                </div>
              </Link>
              <div className="mx-auto h-px w-[95%] bg-accentText50 dark:bg-accentTextDark50" />
            </li>

            <li className="mt-0!">
              <Link
                prefetch
                href={`/${locale}/${RoutesName.tradeRules}`}
                className="flex min-h-14 w-full items-center justify-end p-4"
              >
                <div className="flex items-center justify-end gap-4">
                  <p className="text-[13px] text-mainText dark:text-mainTextDark">
                    {t("tradeRules")}
                  </p>
                  <RiSwap3Line className="scale-150 text-accentText dark:text-accentTextDark" />
                </div>
              </Link>

              <div className="mx-auto h-px w-[95%] bg-accentText50 dark:bg-accentTextDark50" />
            </li>

            <li className="mt-0!">
              <Link
                prefetch
                href={`/${locale}/${RoutesName.terms}`}
                className="flex min-h-14 w-full items-center justify-end p-4"
              >
                <div className="flex items-center justify-end gap-4">
                  <p className="text-[13px] text-mainText dark:text-mainTextDark">
                    {t("termsAndCondition")}
                  </p>
                  <RiScales3Line className="scale-150 text-accentText dark:text-accentTextDark" />
                </div>
              </Link>
              <div className="mx-auto h-px w-[95%] bg-accentText50 dark:bg-accentTextDark50" />
            </li>

            {isLoggedIn && (
              <li className="mt-0!">
                <div
                  className="flex min-h-14 w-full items-center justify-end p-4"
                  onClick={() => {
                    handleLogout();
                    onClose();
                  }}
                >
                  <div className="flex items-center justify-end gap-4">
                    <p className="text-[13px] text-mainText dark:text-mainTextDark">
                      {t("logout")}
                    </p>
                    <IoIosLogOut className="scale-150 text-negative" />
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default SideDrawer;
