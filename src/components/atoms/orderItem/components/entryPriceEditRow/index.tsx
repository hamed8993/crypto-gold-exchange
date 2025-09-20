import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { FaRegEdit } from "react-icons/fa";

interface EntryPriceEditRowProps {
  entryPrice: string;
  quote: string;
  hasEdit: boolean;
  onEdit: () => void;
}

function EntryPriceEditRow({
  entryPrice,
  hasEdit,
  onEdit,
  quote,
}: EntryPriceEditRowProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();

  return (
    <div className="flex w-full items-center justify-between">
      <div className="mt-2 flex w-full items-center justify-start gap-1">
        <p className="text-xs text-accentText dark:text-accentTextDark">
          {t("entryPrice")}:
        </p>
        <p className="font-english text-xs text-mainText dark:text-mainTextDark">
          {addCommaSeparator(entryPrice)}
        </p>
        <p className="mt-1 text-xs text-accentText dark:text-accentTextDark">
          {getQuoteName(quote)}
        </p>
      </div>
      {hasEdit ? (
        <div onClick={onEdit} className="flex items-center justify-start gap-1">
          <FaRegEdit className="h-4 w-4 text-mainBrandAlternative" />
          <p className="text-sm text-mainBrandAlternative">{t("edit")}</p>
        </div>
      ) : null}
    </div>
  );
}

export default EntryPriceEditRow;
