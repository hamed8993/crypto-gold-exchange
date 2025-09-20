import { useTranslations } from "next-intl";

function TableHeader() {
  const t = useTranslations();

  return (
    <div className="mt-2 flex w-full items-center justify-between p-2">
      <div className="flex w-[40%] items-center justify-start">
        <p className="text-accentText text-sm">{t("market")}</p>
      </div>
      <div className="flex w-[30%] items-center justify-start">
        <p className="text-accentText text-sm">{t("price")}</p>
      </div>
      <div className="flex w-[30%] items-center justify-start">
        <p className="text-accentText text-sm">{t("24hChange")}</p>
      </div>
    </div>
  );
}

export default TableHeader;
