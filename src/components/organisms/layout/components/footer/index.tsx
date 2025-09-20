"use client";

import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoWallet, IoWalletOutline } from "react-icons/io5";
import { LuCopyPlus } from "react-icons/lu";
import { MdOutlineCandlestickChart } from "react-icons/md";
import { TbCopyPlusFilled, TbHomeSignal } from "react-icons/tb";
import LoginRegisterDrawer from "../../../../molecules/loginRegisterDrawer";
import FooterLink from "../footerLink";

function Footer() {
  const t = useTranslations();
  const { isActive } = useUrl();
  const { isLoggedIn } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-auto flex h-20 items-center justify-between bg-mainBackground pb-4 dark:bg-mainBackgroundDark">
      <FooterLink
        href="/"
        icon={
          <TbHomeSignal
            className={clsx(
              "h-6 w-6 text-accentText dark:text-accentTextDark",
              isActive("/") && "text-mainText dark:text-mainTextDark",
            )}
          />
        }
        text={t("home")}
      />

      <FooterLink
        extraHref={RoutesName.trade}
        href={RoutesName.markets}
        icon={
          <MdOutlineCandlestickChart
            className={clsx(
              "h-6 w-6 text-accentText dark:text-accentTextDark",
              isActive("/markets") || isActive("/trade")
                ? "text-mainText dark:text-mainTextDark"
                : "",
            )}
          />
        }
        text={t("trade")}
      />

      <FooterLink
        href={RoutesName.portfolio}
        icon={
          isActive("/account/portfolio") ? (
            <IoWallet className="h-6 w-6 text-mainText dark:text-mainTextDark" />
          ) : (
            <IoWalletOutline className="h-6 w-6 text-accentText dark:text-accentTextDark" />
          )
        }
        isLink={isLoggedIn}
        onClick={() => {
          setIsOpen(true);
        }}
        text={t("portfolio")}
      />

      <FooterLink
        href={RoutesName.ordersHistory}
        icon={
          isActive("/account/orders-history") ? (
            <TbCopyPlusFilled className="h-6 w-6 text-mainText dark:text-mainTextDark" />
          ) : (
            <LuCopyPlus className="h-6 w-6 text-accentText dark:text-accentTextDark" />
          )
        }
        isLink={isLoggedIn}
        onClick={() => {
          setIsOpen(true);
        }}
        text={t("historyTitle")}
      />

      <LoginRegisterDrawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
}

export default Footer;
