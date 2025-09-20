"use client";

import ButtonLink from "@/components/atoms/buttonLink";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ContactSection = () => {
  const t = useTranslations();

  const { locale } = useUrl();

  return (
    <motion.div
      className="fadeInUp relative mx-auto overflow-hidden px-5 py-20 md:py-24 lg:pt-32 lg:pb-24 xl:container xl:py-40"
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-mainText text-center text-3xl font-bold md:text-4xl lg:text-5xl xl:mx-auto xl:max-w-4xl">
        {t("supportRely")}
      </h2>

      <p className="text-landingAccentText pt-3 pb-8 text-center text-base md:px-32 md:pt-4 md:pb-10 lg:px-56 lg:pt-6 lg:pb-12 xl:mx-auto xl:max-w-6xl xl:pb-14">
        {t("supportDesc")}
      </p>

      <ButtonLink
        className="group relative mx-auto flex w-full max-w-[20.938rem] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-solid border-gray-800 bg-gray-800! px-3.5 py-2.5 text-center text-base font-medium text-white transition-colors duration-300 hover:bg-gray-950! focus:ring-4 focus:ring-gray-300 focus:outline-none disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 md:w-max md:max-w-max"
        href={`/${locale}/${RoutesName.about}`}
      >
        {t("contactUs")}
      </ButtonLink>

      <Image
        alt="Award image"
        className="absolute hidden md:-right-20 md:-bottom-10 md:w-[269px] lg:block lg:w-[304px] xl:-bottom-14 xl:w-[444px]"
        height={469}
        src={"/assets/images/award.webp"}
        width={444}
      />
    </motion.div>
  );
};

export default ContactSection;
