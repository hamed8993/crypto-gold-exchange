"use client";

import { localeType } from "@/app/[locale]/layout";
import DrawerPageInstant from "@/components/atoms/drawerPageInstant";
import { rtlLanguages } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import { usePostUser_dataSet_language } from "@/core/services/hooks";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { IoCheckmark, IoChevronBack } from "react-icons/io5";

interface ChangeLanguageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function ChangeLanguageDrawer({ isOpen, onClose }: ChangeLanguageDrawerProps) {
  const t = useTranslations();
  const { replace } = useRouter();
  const pathname = usePathname();
  const { locale } = useUrl();

  const { isLoggedIn } = useAuth();

  const languages = [
    { language: "English", locale: "en" },
    { language: "فارسی", locale: "fa" },
    { language: "العربية", locale: "ar" },
    { language: "Русский", locale: "ru" },
    { language: "Türkçe", locale: "tr" },
  ];

  const { mutate: mutateSetLanguage } = usePostUser_dataSet_language();

  const changeLanguage = (value: localeType) => {
    if (isLoggedIn) {
      mutateSetLanguage({
        requestBody: {
          language: value,
        },
      });
    }
    replace(pathname.replace(`/${locale}`, `/${value}/`));
  };

  return (
    <DrawerPageInstant hasCross={false} isOpen={isOpen} onClose={onClose}>
      <div className="flex min-h-14 w-full items-center justify-between overflow-visible bg-mainBackground px-4 dark:bg-mainBackgroundDark">
        <IoChevronBack
          className={clsx(
            "h-7 w-7 text-mainText dark:text-mainTextDark",
            rtlLanguages.includes(locale as localeType) ? "rotate-180" : "",
          )}
          onClick={onClose}
        />

        <p className="text-lgs text-mainText dark:text-mainTextDark">
          {t("language")}
        </p>

        <IoChevronBack
          className={clsx(
            "h-7 w-7 text-transparent dark:text-transparent",
            rtlLanguages.includes(locale as localeType) ? "rotate-180" : "",
          )}
        />
      </div>

      {languages?.map((item) => {
        return (
          <div
            className="flex min-h-14 w-full items-center justify-between border-b border-b-accentText50 px-3 dark:border-b-accentTextDark50"
            onClick={() => {
              changeLanguage(item.locale as localeType);
            }}
            key={item.locale}
          >
            <p
              className={clsx(
                "text-sm",
                item?.locale === locale
                  ? "text-negative"
                  : "text-mainText dark:text-mainTextDark",
              )}
            >
              {item?.language}
            </p>
            {item?.locale === locale ? (
              <IoCheckmark className="h-5 w-5 text-negative dark:text-negativeDark" />
            ) : null}
          </div>
        );
      })}
    </DrawerPageInstant>
  );
}

export default ChangeLanguageDrawer;
