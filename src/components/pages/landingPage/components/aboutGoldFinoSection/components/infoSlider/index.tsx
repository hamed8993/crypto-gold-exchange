"use client";

import ButtonDefault from "@/shared/atoms/buttonDefault";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type infoItemTYpe = {
  id: string;
  title: string;
  text: string;
};

function InfoSlider() {
  const t = useTranslations();

  const infoItemsList: infoItemTYpe[] = [
    {
      id: "1",
      title: t("aboutGoldfinoInfoSliderItem1Title"),
      text: t("aboutGoldfinoInfoSliderItem1Text"),
    },
    {
      id: "2",
      title: t("aboutGoldfinoInfoSliderItem2Title"),
      text: t("aboutGoldfinoInfoSliderItem2Text"),
    },
    {
      id: "3",
      title: t("aboutGoldfinoInfoSliderItem3Title"),
      text: t("aboutGoldfinoInfoSliderItem3Text"),
    },
    {
      id: "4",
      title: t("aboutGoldfinoInfoSliderItem4Title"),
      text: t("aboutGoldfinoInfoSliderItem4Text"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % infoItemsList.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + infoItemsList.length) % infoItemsList.length,
    );
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="flex w-full items-center">
      <span className="bg-newColor_borderNeutral10 inline h-px w-full lg:flex-1" />
      <div className="border-newColor_borderNeutral10 bg-newColor_bgNeutral5 flex min-w-[685px] flex-col gap-2 rounded-xl border p-3 lg:w-[975px] 2xl:w-[1154px]">
        <div className="flex ltr:justify-start rtl:justify-end">
          <div dir="rtl" className="flex items-center gap-2">
            <ButtonDefault
              onClick={prevSlide}
              className="size-10 rounded-[4px]! p-2"
              variant="outline"
            >
              <IoIosArrowForward />
            </ButtonDefault>
            <ButtonDefault
              onClick={nextSlide}
              className="size-10 rounded-[4px]! p-2"
              variant="outline"
            >
              <IoIosArrowBack />
            </ButtonDefault>
          </div>
        </div>

        <div className="border-newColor_borderNeutral10 bg-constantLight overflow-hidden rounded-lg border p-3">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={infoItemsList[currentIndex].id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex w-full flex-col gap-6"
            >
              <p className="text-newColor_bgPrimary50 text-base font-normal">
                {infoItemsList[currentIndex].title}
              </p>
              <p className="text-textSecondary text-base font-normal">
                {infoItemsList[currentIndex].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <span className="bg-newColor_borderNeutral10 inline h-px w-full lg:flex-1" />
    </div>
  );
}

export default InfoSlider;
