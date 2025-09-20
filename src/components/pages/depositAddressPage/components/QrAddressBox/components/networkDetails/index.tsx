import { useTranslations } from "next-intl";

interface NetworkDetailsProps {
  network?: string;
  coin?: string;
}

function NetworkDetails({ coin, network }: NetworkDetailsProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col w-full justify-start items-center gap-2">
      <div className="mt-3 flex w-full items-center justify-between px-3">
        <p className="text-xs text-accentText dark:text-accentTextDark">
          {t("coinName")}
        </p>
        <p className="font-english text-xs text-mainText dark:text-mainTextDark">
          {coin?.toUpperCase()}
        </p>
      </div>
      <div className="mt-3 flex w-full items-center justify-between px-3">
        <p className="text-xs text-accentText dark:text-accentTextDark">
          {t("network")}
        </p>
        <p className="font-english text-xs text-mainText dark:text-mainTextDark">
          {network?.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export default NetworkDetails;
