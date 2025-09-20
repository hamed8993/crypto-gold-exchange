import { useTranslations } from "next-intl";
import Image from "next/image";

const SafetySection = () => {
  const t = useTranslations();

  return (
    <div className="mt-32">
      <div className="mx-auto px-5 xl:container xl:max-w-[1285px]">
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(121deg,#04112B_28.47%,#062C5A_72.5%)] p-5 text-center">
          <div className="relative z-10 rounded-xl border border-[rgba(255,255,255,0.20)] bg-[linear-gradient(275deg,rgba(255,255,255,0.05)_40.89%,rgba(153,153,153,0.05)_99.46%)] p-6 md:p-10 lg:px-20 lg:py-14 xl:py-20">
            <h2 className="text-3xl font-bold text-white md:px-10 md:text-4xl lg:text-5xl">
              {t("fundsSecure")}
            </h2>
            <p className="mt-4 text-lg font-medium text-[#b2ddff] lg:px-5 lg:text-xl xl:px-36">
              {t("multiRegulated1")}
              <span className="text-white">{t("multiRegulated2")}</span>
              {t("multiRegulated3")}
            </p>
            <Image
              alt="Shield icon"
              width={500}
              height={500}
              className="absolute bottom-[-62px] right-[-112px] w-[330px] opacity-[0.3] mix-blend-luminosity md:bottom-[-82px] md:right-[-92px] md:opacity-[0.4] lg:bottom-[-109px] lg:right-[-121px] lg:w-[364px] xl:bottom-[-83px] xl:right-[-94px] xl:w-[350px]"
              src={"/assets/images/shield-1.webp"}
            />
            <Image
              alt="Abstract background image"
              width={1246}
              height={320}
              className="absolute left-1/2 top-0 h-full max-w-max translate-x-[-55%] mix-blend-luminosity lg:max-w-full lg:translate-x-[-50%] xl:w-full"
              src={"/assets/images/count-on-goldfino-bg.webp"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetySection;
