import CustomDrawer from "@/components/atoms/customDrawer";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { BsChatLeftText } from "react-icons/bs";
import { FaHeadset, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
interface HelpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function HelpDrawer({ isOpen, onClose }: HelpDrawerProps) {
  const t = useTranslations();
  const { locale } = useUrl();
  return (
    <CustomDrawer
      isOpen={isOpen}
      onClose={onClose}
      hasCross={false}
      height="h-96 min-46"
    >
      <div className="flex flex-col items-center justify-start px-4 py-2 pb-4">
        <div className="flex h-1 w-20 rounded-full bg-accentText dark:bg-accentTextDark"></div>
        <p className="mt-2 self-start text-lg text-mainText dark:text-mainTextDark">
          {t("hello")}
        </p>
        <p className="mt-3 self-start text-sm text-mainText dark:text-mainTextDark">
          {t("howCanWeHelp")}
        </p>
        <p className="mt-2 self-start text-xs text-accentText dark:text-accentTextDark">
          {t("chooseHowYouPreferToReceiveSupport")}
        </p>
        <Link
          prefetch
          href={`/${locale}/${RoutesName.support}`}
          className="flex h-16 w-full items-center justify-start gap-2"
        >
          <div className="flex h-16 w-full items-center justify-start gap-2">
            <BsChatLeftText className="text-xl text-mainText dark:text-mainTextDark" />
            <p className="text-lg text-mainText dark:text-mainTextDark">
              {t("support")}
            </p>
          </div>
        </Link>
        <div className="flex h-16 w-full items-center justify-start gap-2">
          <FaWhatsapp className="text-lg text-mainText dark:text-mainTextDark" />
          <p className="text-lg text-mainText dark:text-mainTextDark">
            {t("whatsapp")}
          </p>
        </div>
        <div className="flex h-16 w-full items-center justify-start gap-2">
          <FaTelegramPlane className="text-lg text-mainText dark:text-mainTextDark" />
          <p className="text-lg text-mainText dark:text-mainTextDark">
            {t("telegram")}
          </p>
        </div>
        <div className="flex h-16 w-full items-center justify-start gap-2">
          <FaHeadset className="text-lg text-mainText dark:text-mainTextDark" />
          <p className="text-lg text-mainText dark:text-mainTextDark">
            {t("helpCenter")}
          </p>
        </div>
        <div className="flex h-16 w-full items-center justify-start gap-2">
          <IoMailOpenOutline className="text-lg text-mainText dark:text-mainTextDark" />
          <p className="text-lg text-mainText dark:text-mainTextDark">
            {t("email")}
          </p>
        </div>
      </div>
    </CustomDrawer>
  );
}

export default HelpDrawer;
