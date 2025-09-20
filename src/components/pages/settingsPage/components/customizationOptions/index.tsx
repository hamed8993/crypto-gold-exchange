"use client";

import CustomSwitch from "@/components/atoms/customSwitch";
import { useAuth } from "@/core/providers/authProvider";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { MdOutlineLanguage, MdOutlineLightMode } from "react-icons/md";
import ChangeLanguageDrawer from "../../../../molecules/changeLanguageDrawer";

function CustomizationOptions() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const { isLoggedIn } = useAuth();
  const [isLanguageDrawerOpen, setIsLanguageDrawerOpen] = useState(false);

  const themeHandler = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="divide-border bg-surface mb-2 flex h-fit w-full cursor-pointer flex-col divide-y rounded-lg">
      <div
        className="flex items-center justify-between px-2 py-1"
        onClick={themeHandler}
      >
        <div className="flex items-center gap-2">
          <div
            className={`flex min-h-8 min-w-8 items-center justify-center rounded-lg`}
          >
            <MdOutlineLightMode className="text-negative h-6 w-6" />
          </div>
          <span className="text-mainText text-xs">{t("darkMode")}</span>
        </div>
        <span className="flex min-h-10 min-w-10 items-center justify-center">
          <CustomSwitch enabled={theme === "dark"} />
        </span>
      </div>

      <div
        className="flex items-center justify-between px-2 py-1"
        onClick={() => {
          setIsLanguageDrawerOpen(true);
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className={`flex min-h-8 min-w-8 items-center justify-center rounded-lg`}
          >
            <MdOutlineLanguage className="text-negative h-6 w-6" />
          </div>
          <span className="text-mainText text-xs">{t("language")}</span>
        </div>

        <IoChevronForward className="text-accentText rtl:rotate-180" />
      </div>

      {isLoggedIn && (
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

export default CustomizationOptions;
