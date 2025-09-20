import ButtonLink from "@/components/atoms/buttonLink";
import { RoutesName } from "@/core/constants/routes";
import { useTranslations } from "next-intl";

const WelcomeSection = () => {
  const t = useTranslations();

  return (
    <>
      <p className="animate-fadeUp100 bg-landing-text-gradient bg-clip-text text-center text-6xl leading-normal font-bold text-transparent opacity-0">
        <span className="text-mainBrandAlternative me-4">{t("goldfino")}</span>
        {t("xauabtTrade")} <br />
        <span className="text-5xl">{t("PreciousMetals")}</span>
      </p>

      <p className="animate-fadeUp30 text-landingAccentText mt-8 opacity-0">
        {t("fullTimeTrade")}
      </p>

      <div className="animate-fadeUp50 mt-7 flex flex-col items-center gap-6 opacity-0">
        <ButtonLink
          className="w-fit max-w-fit px-4 py-3 text-lg!"
          href={`${RoutesName.trade}/xauabt-irt`}
          variant="landing"
        >
          {t("startTrading")}
        </ButtonLink>
      </div>
    </>
  );
};

export default WelcomeSection;
