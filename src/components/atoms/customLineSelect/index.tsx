"use client";

import { localeType } from "@/app/[locale]/layout";
import { rtlLanguages } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import CustomDrawer from "../customDrawer";
import CustomInput from "../customInput";

interface CustomLineSelectProps {
  drawerClassName?: string;
  drawerHeight?: string;
  label?: string;
  mappedComponent: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: any) => void;
  placeHolder?: string;
  setSearch?: (value: string) => void;
  value?: string;
  wrapperClassName?: string;
}

function CustomLineSelect({
  drawerClassName,
  drawerHeight,
  label,
  mappedComponent,
  placeHolder,
  setSearch,
  value,
  wrapperClassName,
}: CustomLineSelectProps) {
  const t = useTranslations();

  const { locale } = useUrl();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setSearch?.(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    setIsOpen(false);
  }, [value]);

  return (
    <div className="flex h-full w-full items-center justify-start">
      <div
        onClick={() => setIsOpen(true)}
        className={clsx(
          "flex w-full cursor-pointer flex-col items-start gap-2",
          wrapperClassName,
        )}
      >
        <span className="text-sm text-mainText dark:text-mainTextDark">
          {label}
        </span>
        <div className="border-b-accent50 dark:border-b-accentDark50 flex h-10 w-full cursor-pointer items-center justify-between border-b">
          <p
            className={clsx(
              "text-sm",
              value
                ? "font-bold text-mainText dark:text-mainTextDark"
                : "text-accentText dark:text-accentTextDark",
            )}
          >
            {value ? value : placeHolder}
          </p>
          <IoChevronDown className="scale-75 text-accentText rtl:rotate-180 dark:text-accentTextDark" />
        </div>
      </div>
      <CustomDrawer
        drawerClassName={drawerClassName}
        hasCross={false}
        hasRadius={false}
        height={drawerHeight || "500px"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex h-full w-full flex-col items-center justify-start p-2 py-4">
          <div className="flex w-full items-center justify-between">
            <CustomInput
              inputClassName={clsx(
                "h-10 !bg-accentText50 dark:!bg-accentTextDark50 border-none rounded-[4px]! text-mainText dark:text-mainTextDark placeholder:text-accentText dark:placeholder:text-accentTextDark ps-10 ",
              )}
              style={{ paddingInline: 40 }}
              maxLength={50}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              hasRemoveIcon={!!searchTerm}
              onRemoveIcon={() => {
                setSearchTerm("");
              }}
              icon={
                <IoMdSearch className="scale-150! text-mainText dark:text-mainTextDark" />
              }
              iconClassName={
                "h-full top-[30%]! start-2 w-8! h-8! cursor-default"
              }
              placeholder={t("searchCountries")}
              value={searchTerm}
              wrapperClassName="h-10 w-full pe-2"
            />
            <button
              className={clsx(
                "h-full min-w-16 text-xs uppercase text-positive underline dark:text-positiveDark",
                rtlLanguages.includes(locale as localeType)
                  ? "underline-offset-4"
                  : "",
              )}
              type="button"
              onClick={() => setIsOpen(false)}
            >
              {t("cancel")}
            </button>
          </div>
          {mappedComponent}
        </div>
      </CustomDrawer>
    </div>
  );
}

export default CustomLineSelect;
