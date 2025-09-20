import { PaginationType } from "@/core/hooks/usePagination";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import TableDefaultBody from "./tableParts/tableDefaultBody";
import TableDefaultFoot from "./tableParts/tableDefaultFoot";
import TableDefaultHead from "./tableParts/tableDefaultHead";

export type SortType = "string" | "number" | "date";
export type sortConfigType<T> = {
  key: keyof T;
  direction: "asc" | "desc";
} | null;
export type TableCol<T> = {
  key: keyof T;
  header: React.ReactNode;
  cell: (value: T) => React.ReactNode;
  sortable?: boolean;
  sortType?: SortType;
  headClassName?: string;
};
export interface TableDefaultProps<T> {
  cols: TableCol<T>[];
  data?: T[];
  columnVisibility?: Record<string, boolean | undefined>;
  isLoading?: boolean;
  hasDetails?: boolean;
  hasEdit?: boolean;
  pagination?: PaginationType;
  lastPage?: string;
  onDetailsClicked?: (rowData: T) => void;
  onEditClicked?: (rowData: T) => void;
  tableBodyRowClassName?: string;
  tableHeadClassName?: string;
  tableContainerClassName?: string;
  tableBodyCellClassName?: string;
  customEmptyView?: ReactNode;
}

function TableDefault<T>({
  columnVisibility,
  cols,
  data,
  isLoading,
  hasEdit = false,
  hasDetails = true,
  pagination,
  lastPage,
  onDetailsClicked,
  onEditClicked,
  tableBodyRowClassName,
  tableHeadClassName,
  tableContainerClassName,
  tableBodyCellClassName,
  customEmptyView,
}: TableDefaultProps<T>) {
  const visibleCols = columnVisibility
    ? cols.filter((col) => columnVisibility[col.key as string] !== false)
    : cols;

  const [sortConfig, setSortConfig] = useState<sortConfigType<T>>(null);

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) {
        return { key, direction: "asc" };
      }
      if (prev.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };

  return (
    <div
      className={clsx(
        "border-accentText50 dark:border-accentTextDark50 w-full overflow-hidden rounded-lg border",
        tableContainerClassName,
      )}
    >
      <table className="w-full">
        <TableDefaultHead
          hasDetails={hasDetails}
          visibleCols={visibleCols}
          hasEdit={hasEdit}
          onSort={handleSort}
          sortConfig={sortConfig}
          tableHeadClassName={tableHeadClassName}
        />
        <TableDefaultBody
          data={data}
          hasDetails={hasDetails}
          isLoading={isLoading}
          onDetailsClicked={onDetailsClicked}
          visibleCols={visibleCols}
          onEditClicked={onEditClicked}
          hasEdit={hasEdit}
          sortConfig={sortConfig}
          tableBodyRowClassName={tableBodyRowClassName}
          tableBodyCellClassName={tableBodyCellClassName}
          customEmptyView={customEmptyView}
        />
        {pagination && !isLoading && data && data.length > 1 && (
          <TableDefaultFoot lastPage={lastPage} pagination={pagination} />
        )}
      </table>
    </div>
  );
}
export default TableDefault;
