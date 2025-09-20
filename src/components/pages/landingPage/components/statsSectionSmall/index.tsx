"use client";
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

const StatsSectionsSmall = () => {
  const t = useTranslations();

  return (
    <div className="bg-landingSecondaryBackground flex min-h-96 w-full flex-col items-center justify-center rounded-t-[6.25rem] px-5 py-24">
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
      </div>
    </div>
  );
};

export default StatsSectionsSmall;
