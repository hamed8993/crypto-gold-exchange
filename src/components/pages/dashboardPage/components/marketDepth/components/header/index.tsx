import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations();

  return (
    <div className="mt-4 flex w-full min-w-full items-center justify-between gap-10 bg-surface px-3 py-2 dark:bg-surfaceDark">
      <p className="min-w-24 max-w-24 text-xs text-accentText dark:text-accentTextDark">
        {t("market")}
      </p>
      <p className="min-w-12 max-w-12 font-english text-xs text-accentText dark:text-accentTextDark">
        {"% 24h"}
      </p>
      <div className="flex w-full items-center justify-center">
        <p className="text-xs text-accentText dark:text-accentTextDark">
          {t("longAndShortVolume")}
        </p>
      </div>
    </div>
  );
};

export default Header;
