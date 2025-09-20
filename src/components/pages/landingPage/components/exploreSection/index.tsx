"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const ExploreSection = () => {
  const t = useTranslations();

  return (
    <div className="mx-auto flex max-w-[1350px] flex-col items-center justify-center overflow-hidden px-5 py-32">
      <motion.div
        className="animate-fadeUp50 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-accentText text-5xl font-bold">
          {t("LineByLine")}
          <span className="text-landingMainBrand mx-2">{t("quote")}</span>
        </h2>
        <p className="text-accentText pt-6 pb-12 text-xl">
          {t("topFourReason")}
        </p>
      </motion.div>

      <div className="grid grid-cols-12 gap-5">
        <motion.div
          className="group relative col-span-12 flex min-h-[300px] w-full flex-col overflow-hidden rounded-3xl p-8 shadow-md lg:col-span-8"
          initial={{ opacity: 0, x: -50 }}
          style={{
            background: "radial-gradient(circle, #172543, #000000)",
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className="flex h-full flex-col items-start">
            <div>
              <h3 className="text-3xl font-bold text-white xl:text-4xl">
                {t("goldSilverCrypto")}
              </h3>
              <p className="max-w-96 py-4 text-base font-medium text-gray-200 xl:max-w-104">
                {t("fullAccessApp")}
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="group relative col-span-6 flex min-h-[300px] w-full flex-col overflow-hidden rounded-3xl bg-[#102a56] p-8 shadow-md lg:col-span-4"
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div>
            <h3 className="text-mainTextDark text-3xl font-bold xl:text-4xl">
              {t("leverage20x")}
              <span className="font-english text-positive ms-2">20x</span>
            </h3>
            <p className="max-w-96 py-4 text-base font-medium text-gray-200 xl:max-w-104">
              {t("leverage20xTool")}
            </p>
          </div>
        </motion.div>
        <motion.div
          className="group relative col-span-6 flex min-h-[300px] w-full flex-col overflow-hidden rounded-3xl p-8 shadow-md lg:col-span-5"
          initial={{ opacity: 0, x: -50 }}
          style={{
            background: "linear-gradient(115deg,#12204e,#0c5754)",
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div>
            <h3 className="text-3xl font-bold text-white xl:text-4xl">
              {t("referralToolTitle")}
            </h3>
            <p className="max-w-96 py-4 text-base font-medium text-gray-200 xl:max-w-104">
              {t("referralTool")}
            </p>
          </div>
        </motion.div>
        <motion.div
          className="group relative col-span-12 flex min-h-[300px] w-full flex-col overflow-hidden rounded-3xl bg-[#f2f4f7] p-8 shadow-md lg:col-span-7"
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div>
            <h3 className="text-landingSecondaryText text-3xl font-bold xl:text-4xl">
              {t("tpsl")}
            </h3>
            <p className="text-accentText max-w-96 py-4 text-base font-medium xl:max-w-104">
              {t("tpslTool")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreSection;
