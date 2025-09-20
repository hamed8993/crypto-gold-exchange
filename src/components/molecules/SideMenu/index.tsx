"use client";

import DepositIcon from "@/components/atoms/svg/depositIcon";
import WithdrawIcon from "@/components/atoms/svg/withdrawIcon";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { GrTransaction } from "react-icons/gr";

import { BiLogInCircle } from "react-icons/bi";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { SlHome } from "react-icons/sl";
import SideLink from "../../atoms/SideLink";

const SideMenu = () => {
  const t = useTranslations();

  const { theme } = useTheme();

  const { locale } = useUrl();

  const { handleLogout } = useAuth();

  return (
    <aside className="sticky top-20 h-screen w-80 border-e border-accentText50 bg-mainBackground p-2 dark:border-accentTextDark50 dark:bg-mainBackgroundDark">
      <nav>
        <ul className="divide-y divide-accentText50 dark:divide-accentTextDark50">
          <SideLink
            href={`/${locale}`}
            icon={
              <SlHome
                className="text-mainText dark:text-mainTextDark"
                size={20}
              />
            }
            title={t("home")}
          />
          <SideLink
            href={`/${locale}/${RoutesName.portfolio}`}
            icon={
              <IoWalletOutline
                className="text-mainText dark:text-mainTextDark"
                size={20}
              />
            }
            title={t("portfolio")}
          />
          <SideLink
            href={`/${locale}/${RoutesName.deposit}`}
            icon={
              <DepositIcon
                size={20}
                color={theme === "light" ? "#252525" : "#fff"}
              />
            }
            title={t("deposit")}
          />
          <SideLink
            href={`/${locale}/${RoutesName.withdraw}`}
            icon={
              <WithdrawIcon
                size={20}
                color={theme === "light" ? "#252525" : "#fff"}
              />
            }
            title={t("withdraw")}
          />
          <SideLink
            href={`/${locale}/${RoutesName.transactionsHistory}`}
            icon={
              <GrTransaction
                size={20}
                className="rotate-90"
                color={theme === "light" ? "#252525" : "#fff"}
              />
            }
            title={t("transactionsHistory")}
          />

          <SideLink
            href={`/${locale}/${RoutesName.tradesHistory}`}
            icon={
              <CgArrowsExchangeAltV
                size={22}
                color={theme === "light" ? "#252525" : "#fff"}
              />
            }
            title={t("tradesHistory")}
          />

          <SideLink
            href={`/${locale}/${RoutesName.ordersHistory}`}
            icon={
              <BiLogInCircle
                size={22}
                color={theme === "light" ? "#252525" : "#fff"}
              />
            }
            title={t("ordersHistory")}
          />
          <SideLink
            href={`/${locale}/${RoutesName.settings}`}
            icon={
              <FiSettings
                size={20}
                color={theme === "light" ? "#252525" : "#fff"}
              />
            }
            title={t("settings")}
          />
          <li className="py-2">
            <span
              className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 text-mainText hover:bg-positive dark:text-mainTextDark"
              onClick={handleLogout}
            >
              <IoIosLogOut className="scale-125 text-negative dark:text-negativeDark" />
              {t("logout")}
            </span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
