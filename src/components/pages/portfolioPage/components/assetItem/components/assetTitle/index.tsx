import { useTranslations } from "next-intl";

interface AssetTitleProps {
  coin: string;
}

function AssetTitle({ coin }: AssetTitleProps) {
  const t = useTranslations();

  return (
    <div className="flex h-10 min-h-10 w-full items-center justify-between">
      <p className="text-mainText text-lg">
        {coin === "irt" ? t("irtAccount") : t("usdAccount")}
      </p>
    </div>
  );
}

export default AssetTitle;
