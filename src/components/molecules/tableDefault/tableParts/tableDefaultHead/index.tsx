import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Key } from "react";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { sortConfigType, TableCol } from "../..";

interface TableDefaultHeadProps<T> {
  visibleCols: TableCol<T>[];
  hasDetails?: boolean;
  hasEdit?: boolean;
  onSort?: (key: keyof T) => void;
  sortConfig: sortConfigType<T>;
  tableHeadClassName?: string;
}
function TableDefaultHead<T>({
  hasDetails,
  visibleCols,
  hasEdit,
  onSort,
  sortConfig,
  tableHeadClassName,
}: TableDefaultHeadProps<T>) {
  const t = useTranslations();

  
  return (
    <thead className="bg-surface py-4 dark:bg-surfaceDark">
      <tr>
        {visibleCols.map((col) => (
          <th
            key={col.key as Key}
            onClick={() => col.sortable && onSort?.(col.key)}
            className={clsx(
              "whitespace-nowrap px-2 py-4 xs:px-4",
              col.sortable && "cursor-pointer select-none",
              tableHeadClassName,
            )}
          >
            {typeof col.header === "string" ? (
              <div
                className={clsx(
                  "flex w-full items-center justify-center gap-1",
                  col?.headClassName,
                )}
              >
                <p className="text-xs text-accentText dark:text-accentTextDark">
                  {col.header}
                </p>
                {col.sortable && (
                  <span className="flex flex-col items-center justify-center">
                    <RxTriangleUp
                      size={14}
                      className={clsx(
                        "translate-y-1",

                        sortConfig?.direction === "asc" &&
                          sortConfig?.key === col.key
                          ? "text-mainBrand"
                          : "text-accentText dark:text-accentTextDark",
                      )}
                    />
                    <RxTriangleDown
                      size={14}
                      className={clsx(
                        "-translate-y-1",
                        sortConfig?.direction === "desc" &&
                          sortConfig?.key === col.key
                          ? "text-mainBrand"
                          : "text-accentText dark:text-accentTextDark",
                      )}
                    />
                  </span>
                )}
              </div>
            ) : (
              col.header
            )}
          </th>
        ))}
        {hasDetails && (
          <th className="px-4 py-4">
            <p className="text-xs text-accentText dark:text-accentTextDark">
              {t("details")}
            </p>
          </th>
        )}
        {hasEdit && (
          <th className="px-4 py-4">
            <p className="text-xs text-accentText dark:text-accentTextDark">
              {t("edit")}
            </p>
          </th>
        )}
      </tr>
    </thead>
  );
}

export default TableDefaultHead;
