import { useTranslations } from "next-intl";

function ListHeader() {
  const t = useTranslations();
  return (
    <div className="border-b-accentText50 flex min-h-10 w-full items-center justify-between border-b px-2">
      <div className="flex h-full w-[16%] items-center justify-start">
        <p className="text-accentText text-[11px]">{t("orderType")}</p>
      </div>
      <div className="flex h-full w-[28%] items-center justify-start">
        <p className="text-accentText text-[11px]">
          {`${t("symbol")}/${t("orderId")}`}
        </p>
      </div>
      <div className="flex h-full w-[28%] items-center justify-start">
        <p className="text-accentText text-[11px]">{`${t("volume")}/${t("atPrice")}`}</p>
      </div>
      <div className="flex h-full w-[28%] items-center justify-start">
        <p className="text-accentText text-[11px]">{t("pnl")}</p>
      </div>
    </div>
  );
}

export default ListHeader;
