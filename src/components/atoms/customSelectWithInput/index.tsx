"use client";

import { localeType } from "@/app/[locale]/layout";
import { rtlLanguages } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import CustomInput from "../customInput";

interface CustomSelectWithInputProps {
  drawerClassName?: string;
  label?: string;
  mappedComponent: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: any) => void;
  placeHolder?: string;
  setSearch?: (value: string) => void;
  value?: string;
  wrapperClassName?: string;
}

function CustomSelectWithInput({
  drawerClassName,
  label,
  mappedComponent,
  placeHolder,
  setSearch,
  value,
  wrapperClassName,
}: CustomSelectWithInputProps) {
  const t = useTranslations();
  const parentRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number>(400);

  useEffect(() => {
    if (parentRef.current) setWidth(parentRef.current.offsetWidth);

    function handleClickOutside(event: MouseEvent) {
      if (
        parentRef.current &&
        !parentRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("");
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [parentRef, parentRef?.current?.offsetWidth]);

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

  console.log(isOpen);

  return (
    <div
      className="relative flex h-full w-full items-center justify-start"
      ref={parentRef}
    >
      <div
        onClick={() => setIsOpen(true)}
        className={clsx(
          "flex w-full cursor-pointer flex-col items-start gap-2",
          wrapperClassName,
        )}
      >
        <span className="text-sm text-constantDark dark:text-constantDark">
          {label}
        </span>
        <div className="border-accent50 dark:border-accentDark50 flex h-10 w-full cursor-pointer items-center justify-between rounded-md border px-2">
          <p
            className={clsx(
              "text-sm",
              value
                ? "font-bold text-constantDark dark:text-constantDark"
                : "text-accentText dark:text-accentTextDark",
            )}
          >
            {value ? value : placeHolder}
          </p>
          <IoChevronDown className="scale-75 text-accentText rtl:rotate-180 dark:text-accentTextDark" />
        </div>
      </div>

      <div
        className={clsx(
          "w-4xl absolute bottom-0 start-0 flex translate-y-full flex-col items-center justify-center rounded-lg border border-border shadow-lg dark:border-borderDark",
          isOpen ? "z-20 flex" : "hidden",
          drawerClassName,
        )}
        style={{
          width: width,
        }}
      >
        <div className="max-h-[300px] w-full overflow-hidden rounded-b-lg bg-surface py-3 dark:bg-surfaceDark">
          <div className="flex w-full items-center justify-between ps-2">
            <CustomInput
              inputClassName={clsx(
                "h-10 !bg-accentText50 dark:!bg-accentTextDark50 rounded-[4px]! text-constantDark dark:text-constantDark placeholder:text-accentText dark:placeholder:text-accentTextDark ps-10 ",
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
              icon={<IoMdSearch className="scale-150!" />}
              iconClassName={
                "h-full top-[30%]! start-3  w-8! h-8! cursor-default"
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
              onClick={() => setIsOpen(false)}
              type="button"
            >
              {t("cancel")}
            </button>
          </div>
          {mappedComponent}
        </div>
      </div>
    </div>
  );
}

export default CustomSelectWithInput;
