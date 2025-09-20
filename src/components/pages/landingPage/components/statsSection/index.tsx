"use client";
import CustomButton from "@/components/atoms/customButton";
import InstantWithdrawSVG from "@/components/atoms/svg/InstantWithdraw";
import NoCostSVG from "@/components/atoms/svg/NoCost";
import SeamlessExecutionSVG from "@/components/atoms/svg/SeamlessExecution";
import TightSpreadsSVG from "@/components/atoms/svg/TightSpreads";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type RollingDigitProps = {
  start: number;
  end: number;
  duration?: number; // total duration in ms
};

export const RollingDigit = ({
  start,
  end,
  duration = 1000,
}: RollingDigitProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [digits, setDigits] = useState<number[]>([]);

  useEffect(() => {
    if (!inView) return;
    const list: number[] = [];
    let current = end;
    while (current !== start) {
      list.push(current);
      current = (current + 1) % 10;
    }
    list.push(end);
    setDigits(list);
  }, [inView, start, end]);

  return (
    <div
      ref={ref}
      className="relative inline-block h-[1em] overflow-hidden text-center"
    >
      <motion.div
        initial={{ y: `-${(digits.length - 1) * 100}%` }}
        whileInView={{ y: 0 }} // Translates exactly to target digit
        transition={{ duration: duration / 1000, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="flex w-fit flex-col"
      >
        {digits.map((d, i) => (
          <div key={i} className="font-english h-[1em] leading-none">
            {d}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const StatsSection = () => {
  const t = useTranslations();

  return (
    <div className="bg-landingSecondaryBackground flex min-h-96 w-screen flex-col items-center justify-center rounded-t-[6.25rem] px-5 py-24">
      <motion.div
        className="flex flex-col items-center justify-center gap-3 text-center md:gap-4 lg:gap-6"
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          {t("ourNumbers")}
        </h2>
        <p className="text-landingAccentText text-base md:max-w-lg md:text-lg lg:max-w-full lg:text-xl">
          {t("maxPotential")}
        </p>
      </motion.div>

      <div className="relative mt-8 flex flex-col items-center justify-center gap-10 md:mt-10 md:gap-24 lg:mt-12 xl:mt-14">
        <div className="mx-auto grid min-h-[384px] gap-5 md:min-h-[140px] md:grid-cols-3 md:gap-6 lg:gap-14 lg:px-6 xl:gap-24">
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="flex items-center justify-center gap-2 px-14 text-center font-normal text-white md:items-start md:justify-start md:px-0 md:text-left md:text-lg lg:text-xl md:rtl:text-right">
              <span className="flex items-center gap-[2px]">
                <span className="flex items-center text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                  <RollingDigit start={0} end={1} />
                </span>
                <span className="flex items-center text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                  0.
                </span>
                <span className="flex items-center text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                  <RollingDigit start={0} end={3} />
                </span>
              </span>
              <span className="flex items-center text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                {t("billion")}
              </span>
            </h3>
            <p className="text-constantLight text-lg lg:text-xl">
              {t("tradesExecuted")}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="flex items-center justify-center gap-2 px-14 text-center font-normal text-white md:items-start md:justify-start md:px-0 md:text-left md:text-lg lg:text-xl md:rtl:text-right">
              <span className="flex items-center text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                {t("zero")}
              </span>
            </h3>
            <p className="text-constantLight text-lg lg:text-xl">
              {t("rejectTrades")}
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="flex items-center justify-center gap-2 px-14 text-center font-normal text-white md:items-start md:justify-start md:px-0 md:text-left md:text-lg lg:text-xl md:rtl:text-right">
              <span className="flex items-center gap-[2px]">
                <span className="flex items-center text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                  <RollingDigit start={0} end={9} />
                </span>
                <span className="flex items-center text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                  <RollingDigit start={0} end={2} />
                </span>
                <span className="flex items-center text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                  .
                </span>
                <span className="flex items-center text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                  <RollingDigit start={0} end={9} />
                </span>
              </span>
              <span className="flex items-center text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                {t("billion")}
              </span>
            </h3>
            <p className="text-constantLight text-lg lg:text-xl">
              {t("withdrawApprove")}
            </p>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          whileInView={"visible"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          viewport={{ once: true }}
          className="grid gap-5 md:grid-cols-2 md:gap-7 lg:grid-cols-4 lg:gap-8 xl:gap-10"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl border border-gray-700 bg-gray-950 p-6"
          >
            <div className="relative mb-6 h-16 w-16 lg:h-[80px] lg:w-[80px]">
              <TightSpreadsSVG />
            </div>
            <h3 className="text-xl font-bold text-white">
              {t("tightSpreads")}
            </h3>
            <p className="text-landingAccentText mt-2 text-base font-normal">
              {t("tradeSpreads")}
            </p>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl border border-gray-700 bg-gray-950 p-6"
          >
            <div className="relative mb-6 h-16 w-16 lg:h-[80px] lg:w-[80px]">
              <NoCostSVG />
            </div>
            <h3 className="text-xl font-bold text-white">
              {t("noHiddenCost")}
            </h3>
            <p className="text-landingAccentText mt-2 text-base font-normal">
              {t("zeroCommission")}
            </p>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl border border-gray-700 bg-gray-950 p-6"
          >
            <div className="relative mb-6 h-16 w-16 lg:h-[80px] lg:w-[80px]">
              <SeamlessExecutionSVG />
            </div>
            <h3 className="text-xl font-bold text-white">
              {t("seamlessExecution")}
            </h3>
            <p className="text-landingAccentText mt-2 text-base font-normal">
              {t("enjoyPrices")}
            </p>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl border border-gray-700 bg-gray-950 p-6"
          >
            <div className="relative mb-6 h-16 w-16 lg:h-[80px] lg:w-[80px]">
              <InstantWithdrawSVG />
            </div>
            <h3 className="text-xl font-bold text-white">
              {t("instantWithdrawals")}
            </h3>
            <p className="text-landingAccentText mt-2 text-base font-normal">
              {t("getFunds")}
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-14 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CustomButton className="!bg-landingMainBrand w-fit max-w-fit px-4 py-3 text-lg!">
            {t("startTrading2")}
          </CustomButton>
          <p className="text-landingMainBrand text-sm">{t("riskWarning")}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default StatsSection;
