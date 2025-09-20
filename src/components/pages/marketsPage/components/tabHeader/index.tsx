import { useTranslations } from "next-intl";

function TabHeader() {
  const t = useTranslations();
  return (
    <div className="bg-surface mb-2 flex min-h-7 w-full items-center justify-start">
      <div className="flex h-6 w-[40%] items-center justify-start px-4">
        <p className="text-accentText text-xs">{t("market")}</p>
      </div>
      <div className="flex h-6 w-[30%] items-center justify-center">
        <p className="text-accentText text-xs">{t("long")}</p>
      </div>
      <div className="flex h-6 w-[30%] items-center justify-center">
        <p className="text-accentText text-xs">{t("short")}</p>
      </div>
    </div>
  );
}

export default TabHeader;
