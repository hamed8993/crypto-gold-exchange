import { ReactNode } from "react";
import { IoCopy, IoTrashBin } from "react-icons/io5";

interface FilterItemProps {
  component: ReactNode;
  copy?: () => void;
  deleteInput?: () => void;
  isLongValue?: boolean;
  title: string;
}
const FilterItem = ({
  component,
  copy,
  deleteInput,
  isLongValue = false,
  title,
}: FilterItemProps) => {
  return (
    <div
      className={`border-accentText50 flex h-20 max-h-20 min-h-20 w-full flex-col items-start justify-start gap-2 p-1 ${isLongValue && "col-start-1 col-end-3"}`}
    >
      {isLongValue ? (
        <div className="flex w-full items-center justify-between pe-2">
          <p className="text-accentText ps-1 text-sm">{title}</p>
          <div className="flex items-center justify-between gap-4 py-2">
            <IoCopy
              className="text-mainBrand hover:cursor-pointer"
              onClick={copy}
            />
            <IoTrashBin
              className="text-negative hover:cursor-pointer"
              onClick={deleteInput}
            />
          </div>
        </div>
      ) : (
        <p className="text-accentText ps-1 text-sm">{title}</p>
      )}
      {component}
    </div>
  );
};

export default FilterItem;
