import { useTranslations } from "next-intl";

interface VolumeProps {
  tradeLength: string | number;
}

function Volume({ tradeLength }: VolumeProps) {
  const t = useTranslations();

  return (
    <div className="flex min-h-6 items-center justify-start gap-1">
      <p className="font-english text-accentText text-xs">{tradeLength}</p>
      <p className="text-accentText text-xs">{t("unit")}</p>
    </div>
  );
}

export default Volume;
