import { useTranslations } from "next-intl";
import ListHeaderItem from "../listHeaderItem";

const ListHeader = () => {
  const t = useTranslations();

  return (
    <div className="bg-accentText50 flex h-10 w-full items-center justify-between rounded-lg">
      <div className="flex h-16 w-2" />
      <div className="flex h-16 w-full items-center justify-between">
        <ListHeaderItem title={t("ticketNumber")} />
        <ListHeaderItem title={t("title")} />
        <ListHeaderItem title={t("createdAtDate")} />
        <ListHeaderItem title={t("closedAtDate")} className="hidden lg:flex" />
        <ListHeaderItem title={t("status")} />
      </div>
    </div>
  );
};

export default ListHeader;
