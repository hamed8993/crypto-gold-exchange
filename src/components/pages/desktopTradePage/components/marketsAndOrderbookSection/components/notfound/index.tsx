import SearchNotFoundIcon from "@/components/atoms/svg/searchNotFoundIcon";
import { useTranslations } from "next-intl";

function NotFound() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center gap-2">
      <SearchNotFoundIcon />
      <span className="text-textPlaceholder dark:text-textPlaceholder text-sm font-normal">
        {t("marketNotFound")}
      </span>
    </div>
  );
}

export default NotFound;
