import DepositSVG from "@/components/atoms/svg/DepositSVG";
import GlobalBrandSVG from "@/components/atoms/svg/Global";
import LeverageSVG from "@/components/atoms/svg/LeverageSVG";
import LongShortSVG from "@/components/atoms/svg/LongShortSVG";
import ReferralSVG from "@/components/atoms/svg/ReferralSVG";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const TrustSection = () => {
  const t = useTranslations();

  return (
    <div className="relative mt-16 flex w-full items-center justify-center">
      <div className="h-40 overflow-hidden">
        <motion.ul
          dir="ltr"
          animate={{ x: ["0%", "-100%"] }}
          className="flex max-w-[1350px] items-center gap-16 opacity-80"
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          <li className="divide-landingAccentText flex min-w-fit items-center gap-2">
            <ReferralSVG />
            <span className="bg-landingAccentText h-12 w-px"></span>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-constantLight ms-2 text-xs">
                {t("referral1")}
              </p>
              <p className="text-accentText ms-2 text-xs">
                {t("referral1Desc")}
              </p>
            </div>
          </li>
          <li className="divide-landingAccentText flex min-w-fit items-center gap-2">
            <GlobalBrandSVG />
            <span className="bg-landingAccentText h-12 w-px"></span>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-constantLight ms-2 text-xs">{t("support1")}</p>
              <p className="text-accentText ms-2 text-xs">
                {t("support1Desc")}
              </p>
            </div>
          </li>
          <li className="divide-landingAccentText flex min-w-fit items-center gap-2">
            <LongShortSVG />
            <span className="bg-landingAccentText k h-12 w-px"></span>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-constantLight ms-2 text-xs">
                {t("longShort1")}
              </p>
              <p className="text-accentText ms-2 text-xs">
                {t("longShort1Desc")}
              </p>
            </div>
          </li>
          <li className="divide-landingAccentText flex min-w-fit items-center gap-2">
            <DepositSVG />
            <span className="bg-landingAccentText k h-12 w-px"></span>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-constantLight ms-2 text-xs">{t("deposit1")}</p>
              <p className="text-accentText ms-2 text-xs">
                {t("deposit1Desc")}
              </p>
            </div>
          </li>
          <li className="divide-landingAccentText flex min-w-fit items-center gap-2">
            <LeverageSVG />
            <span className="bg-landingAccentText h-12 w-px"></span>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-constantLight ms-2 text-xs">
                {t("leverage1")}
              </p>
              <p className="text-accentText ms-2 text-xs">
                {t("to")}
                <span className="font-english">20x</span>
                {t("leverage1Desc")}
              </p>
            </div>
          </li>
          <li className="divide-landingAccentText flex min-w-fit items-center gap-2">
            <ReferralSVG />
            <span className="bg-landingAccentText h-12 w-px"></span>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-constantLight ms-2 text-xs">
                {t("referral1")}
              </p>
              <p className="text-accentText ms-2 text-xs">
                {t("referral1Desc")}
              </p>
            </div>
          </li>
          <li className="divide-landingAccentText flex min-w-fit items-center gap-2">
            <GlobalBrandSVG />
            <span className="bg-landingAccentText h-12 w-px"></span>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-constantLight ms-2 text-xs">{t("support1")}</p>
              <p className="text-accentText ms-2 text-xs">
                {t("support1Desc")}
              </p>
            </div>
          </li>
          <li className="divide-landingAccentText flex min-w-fit items-center gap-2">
            <LongShortSVG />
            <span className="bg-landingAccentText h-12 w-px"></span>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-constantLight ms-2 text-xs">
                {t("longShort1")}
              </p>
              <p className="text-accentText ms-2 text-xs">
                {t("longShort1Desc")}
              </p>
            </div>
          </li>
          <li className="divide-landingAccentText flex min-w-fit items-center gap-2">
            <DepositSVG />
            <span className="bg-landingAccentText h-12 w-px"></span>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-constantLight ms-2 text-xs">{t("deposit1")}</p>
              <p className="text-accentText ms-2 text-xs">
                {t("deposit1Desc")}
              </p>
            </div>
          </li>
          <li className="divide-landingAccentText flex min-w-fit items-center gap-2">
            <LeverageSVG />
            <span className="bg-landingAccentText h-12 w-px"></span>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-constantLight ms-2 text-xs">
                {t("leverage1")}
              </p>
              <p className="text-accentText ms-2 text-xs">
                {t("to")}
                <span className="font-english">20x</span>
                {t("leverage1Desc")}
              </p>
            </div>
          </li>
        </motion.ul>
      </div>
    </div>
  );
};

export default TrustSection;
