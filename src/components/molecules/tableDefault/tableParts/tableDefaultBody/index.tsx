import EmptyView from "@/components/atoms/emptyView";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Key, ReactNode, useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";
import { sortConfigType, SortType, TableCol, TableDefaultProps } from "../..";
import { useWindowSize } from "../../../../../core/providers/windowSize";
import CustomButton from "../../../../atoms/customButton";
import LoadingView from "../../../../atoms/loadingView";

interface TableDefaultBodyProps<T>
  extends Omit<
    TableDefaultProps<T>,
    "cols" | "columnVisibility" | "tableLabel" | "tableButton"
  > {
  visibleCols: TableCol<T>[];
  sortConfig: sortConfigType<T>;
  tableBodyRowClassName?: string;
  tableBodyCellClassName?: string;
  customEmptyView?: ReactNode;
}

export default function TableDefaultBody<T>({
  visibleCols,
  data,
  hasDetails = true,
  hasEdit = false,
  onEditClicked,
  isLoading = false,
  onDetailsClicked,
  sortConfig,
  tableBodyRowClassName,
  tableBodyCellClassName,
  customEmptyView,
}: TableDefaultBodyProps<T>) {
  const { width } = useWindowSize();
  const t = useTranslations();

  // TODO: handle symbol cols that don't sort correctly because of col.key problem

  const sortedData = useMemo(() => {
    if (!data) return [];
    if (!sortConfig) return data;

    const defaultSorting = "number";
    const col = visibleCols.find((column) => column.key === sortConfig?.key);

    const sortType = col?.sortType ?? defaultSorting;

    const parseValue = (value: T[keyof T], type: SortType) => {
      return type === "number" ? String(value).replaceAll(",", "") : value;
    };

    return [...data].sort((a, b) => {
      const aValue = parseValue(a[sortConfig?.key], sortType);
      const bValue = parseValue(b[sortConfig?.key], sortType);

      const result: number =
        sortType === "string"
          ? String(aValue).localeCompare(String(bValue))
          : Number(aValue) - Number(bValue);

      return sortConfig?.direction === "asc" ? result : -result;
    });
  }, [data, sortConfig, visibleCols]);

  return (
    <tbody>
      {isLoading || !sortedData ? (
        <tr>
          <td colSpan={100} className="relative h-60">
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingView />
            </div>
          </td>
        </tr>
      ) : sortedData.length === 0 ? (
        <tr>
          <td colSpan={100} className="relative h-60">
            <div className="absolute inset-0 flex items-center justify-center pt-5">
              {customEmptyView || <EmptyView />}
            </div>
          </td>
        </tr>
      ) : (
        sortedData?.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={clsx(
              "hover:bg-subtleBackground hover:bg-surface dark:hover:bg-surfaceDark",
              tableBodyRowClassName,
            )}
          >
            {visibleCols.map((col) => (
              <td
                key={col.key as Key}
                className={clsx(
                  "text-mainText dark:text-mainTextDark px-2 py-2 text-center text-[15px] whitespace-nowrap lg:px-4",
                  tableBodyCellClassName,
                )}
              >
                {col.cell(row)}
              </td>
            ))}

            {hasDetails && (
              <td className="xs:px-4 flex justify-center px-2 py-2">
                {width > 500 ? (
                  <CustomButton
                    variant="outline"
                    className="bg-mainBrand hover:bg-mainBrand/70 max-w-30 rounded px-3 py-1 active:shadow-inner"
                    onClick={() => onDetailsClicked?.(row)}
                  >
                    <p className="text-mainText xs:text-sm dark:text-mainTextDark text-xs">
                      {t("details")}
                    </p>
                  </CustomButton>
                ) : (
                  <BsThreeDots
                    onClick={() => onDetailsClicked?.(row)}
                    className="text-mainText"
                  />
                )}
              </td>
            )}
            {hasEdit && (
              <td className="px-4 py-2 text-center whitespace-nowrap">
                <CustomButton
                  variant="outline"
                  className="bg-mainBrand hover:bg-mainBrand/70 max-w-30 rounded px-3 py-1 text-[15px] text-white active:shadow-inner"
                  onClick={() => onEditClicked?.(row)}
                >
                  {t("edit")}
                </CustomButton>
              </td>
            )}
          </tr>
        ))
      )}
    </tbody>
  );
}
