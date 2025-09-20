/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { localeType } from "@/app/[locale]/layout";
import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import { rtlLanguages } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import Decimal from "decimal.js";
import moment from "moment-jalaali";
import { useTranslations } from "next-intl";
import {
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { DAYS, DAYS_30, ENMONTHS, ENYEARS, MONTHS, YEARS } from "./data";

export interface DatePickerDrawerProps {
  passDate: (
    year: string | number,
    month: string | number,
    day: string | number,
  ) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function DatePickerDrawer({
  passDate,
  isOpen,
  onClose,
}: DatePickerDrawerProps) {
  const t = useTranslations();

  const { locale } = useUrl();

  const days = DAYS;
  const years = rtlLanguages.includes(locale as localeType) ? YEARS : ENYEARS;
  const months = rtlLanguages.includes(locale as localeType)
    ? MONTHS
    : ENMONTHS;

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const scrollRef = useRef(undefined);
  const scrollRef2 = useRef(undefined);
  const scrollRef3 = useRef(undefined);

  // TODO: handle type
  const handleScrollEnd = (
    ref: MutableRefObject<undefined>,
    items: (
      | {
          value: string;
          label: string;
        }
      | {
          value: number;
          label: string;
        }
    )[],

    onChange: {
      (value: SetStateAction<string>): void;
      (arg0: string): void;
    },
  ) => {
    //@ts-ignore
    const scrollTop = ref?.current.scrollTop;
    const snapPoint = Math.round(scrollTop / 50) * 50;
    //@ts-ignore
    ref?.current.scrollTo({
      top: snapPoint,
      behavior: "smooth",
    });

    const selectedIndex = snapPoint / 50;
    onChange(String(items[selectedIndex + 1].value));
  };

  const getToday = () => {
    const day = moment().format("jDD");
    const month = moment().format("jMM");
    const year = moment().format("jYYYY");

    setSelectedDay(day);
    setSelectedYear(year);
    setSelectedMonth(month);

    // TODAY DATE : DAY
    const index = days.findIndex(
      (item: { value: string }) => item.value === day,
    );
    const scrollIndex = Number(new Decimal(index - 1).times(50));
    const snapPoint = Math.round(scrollIndex / 50) * 50;
    //@ts-ignore
    scrollRef?.current?.scrollTo({
      behavior: "smooth",
      top: snapPoint,
    });

    // TODAY DATE : MONTH
    const index2 = months.findIndex(
      (item: { value: string }) => item.value === month,
    );
    const scrollIndex2 = Number(new Decimal(index2 - 1).times(50));
    const snapPoint2 = Math.round(scrollIndex2 / 50) * 50;
    //@ts-ignore
    scrollRef2?.current?.scrollTo({
      top: snapPoint2,
      behavior: "smooth",
    });

    // TODAY DATE : YEAR
    const index3 = years.findIndex(
      (item: { label: string }) => item.label === year,
    );
    const scrollIndex3 = Number(new Decimal(index3 - 3).times(50));
    const snapPoint3 = Math.round(scrollIndex3 / 50) * 50;
    //@ts-ignore
    scrollRef3?.current?.scrollTo({
      top: snapPoint3,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getToday();
  }, [isOpen]);

  const confirm = () => {
    passDate(selectedYear, selectedMonth, selectedDay);
    onClose();
  };

  const days_data = Number(selectedMonth) > 6 ? DAYS_30 : DAYS;

  return (
    <CustomDrawer onClose={onClose} isOpen={isOpen} height={"416px"}>
      <div className="mt-12 flex w-full flex-col items-center justify-start px-3">
        <div className="z-100 flex h-[150px] w-full items-center justify-between gap-[5px]">
          <div
            className="flex h-[150px] w-1/3 flex-col items-center justify-start overflow-y-auto [&::-webkit-scrollbar]:w-0"
            onMouseDown={() => handleScrollEnd(scrollRef, days, setSelectedDay)}
            onMouseUp={() => handleScrollEnd(scrollRef, days, setSelectedDay)}
            onTouchEnd={() => handleScrollEnd(scrollRef, days, setSelectedDay)}
            //@ts-ignore
            ref={scrollRef}
          >
            {days_data.map((item: { label: string | number }, index) => {
              return (
                <div
                  className="flex h-[50px] min-h-[50px] w-full items-center justify-center"
                  key={index}
                >
                  <p
                    className={
                      Number(item.label) === Number(selectedDay)
                        ? "text-[16px] text-mainText opacity-100 dark:text-mainTextDark"
                        : "rotate-x-45 text-[16px] text-accentText opacity-60 dark:text-accentTextDark"
                    }
                  >
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
          <div
            className="flex h-[150px] w-[33%] flex-col items-center justify-start overflow-y-auto [&::-webkit-scrollbar]:w-0"
            onMouseDown={() =>
              handleScrollEnd(scrollRef2, months, setSelectedMonth)
            }
            onMouseUp={() =>
              handleScrollEnd(scrollRef2, months, setSelectedMonth)
            }
            onTouchEnd={() =>
              handleScrollEnd(scrollRef2, months, setSelectedMonth)
            }
            //@ts-ignore
            ref={scrollRef2}
          >
            {months.map(
              (
                item: { value: string | number; label: string | number },
                index,
              ) => {
                return (
                  <div
                    className="flex h-[50px] min-h-[50px] w-full items-center justify-center"
                    key={index}
                  >
                    <p
                      className={
                        Number(item.value) === Number(selectedMonth)
                          ? "text-[16px] text-mainText opacity-100 dark:text-mainTextDark"
                          : "rotate-x-45 text-[16px] text-accentText opacity-60 dark:text-accentTextDark"
                      }
                    >
                      {item.label}
                    </p>
                  </div>
                );
              },
            )}
          </div>
          <div
            className="flex h-[150px] w-[33%] flex-col items-center justify-start overflow-y-auto [&::-webkit-scrollbar]:w-0"
            onMouseDown={() =>
              handleScrollEnd(scrollRef3, years, setSelectedYear)
            }
            onMouseUp={() =>
              handleScrollEnd(scrollRef3, years, setSelectedYear)
            }
            onTouchEnd={() =>
              handleScrollEnd(scrollRef3, years, setSelectedYear)
            }
            //@ts-ignore
            ref={scrollRef3}
          >
            {years.map(
              (
                item: { value: string | number; label: string | number },
                index,
              ) => {
                return (
                  <div
                    className="flex h-[50px] min-h-[50px] w-full items-center justify-center"
                    key={index}
                  >
                    <p
                      className={
                        Number(item.value) === Number(selectedYear)
                          ? "text-[16px] text-mainText opacity-100 dark:text-mainTextDark"
                          : "rotate-x-45 text-[16px] text-accentText opacity-60 dark:text-accentTextDark"
                      }
                    >
                      {item.label}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        </div>
        <div className="absolute mt-12 flex h-12 w-full justify-between self-center">
          <div className="mx-[4%] flex h-12 w-1/3 self-center rounded-lg bg-mainBrand/5" />
          <div className="mx-[4%] flex h-12 w-1/3 self-center rounded-lg bg-mainBrand/5" />
          <div className="mx-[4%] flex h-12 w-1/3 self-center rounded-lg bg-mainBrand/5" />
        </div>
        <CustomButton
          className="mt-5 flex h-12 w-[96%] items-center justify-center self-center rounded-lg border border-border dark:border-borderDark"
          onClick={getToday}
          variant="textPositive"
        >
          <p className="text-sm">{t("goToToday")}</p>
        </CustomButton>
        <CustomButton
          className="mt-2 flex h-12 w-[96%] items-center justify-center self-center rounded-lg"
          onClick={confirm}
          variant="primary"
        >
          <p className="text-sm">{t("confirm")}</p>
        </CustomButton>
      </div>
    </CustomDrawer>
  );
}
