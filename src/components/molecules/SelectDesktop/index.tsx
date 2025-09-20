import CustomSelect, {
  CustomSelectProps,
} from "@/components/atoms/customSelect";
import clsx from "clsx";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface SelectDesktopProps
  extends Omit<
    CustomSelectProps,
    "toggler" | "isVisible" | "setIsVisible" | "children"
  > {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  label?: string;
  labelContainerClassName?: string;
  optionsComponent?: ReactNode;
  valueComponent?: ReactNode;
}

function SelectDesktop({
  isOpen,
  setIsOpen,
  label,
  labelContainerClassName,
  optionsComponent,
  valueComponent,
  ...rest
}: SelectDesktopProps) {
  return (
    <div className="relative mt-4 flex w-full flex-col gap-2">
      <div
        className={clsx(
          "absolute -top-4 right-2 z-1 flex items-center justify-center bg-secondBackground px-5 py-2 dark:bg-secondBackgroundDark",
          labelContainerClassName,
        )}
      >
        <label className="mx-2 text-xs text-mainText dark:text-mainTextDark">
          {label}
        </label>
      </div>

      <CustomSelect
        isVisible={isOpen}
        setIsVisible={setIsOpen}
        toggler={
          <div
            className={clsx(
              "flex h-14 w-full items-center self-end rounded-lg border border-accentText50 px-3 dark:border-x-accentTextDark50",
              isOpen && "border-mainText",
            )}
          >
            {valueComponent}

            {!isOpen ? (
              <FaChevronDown className="h-3.5 w-3.5 text-accentText dark:text-accentTextDark" />
            ) : (
              <FaChevronUp className="h-3.5 w-3.5 text-accentText dark:text-accentTextDark" />
            )}
          </div>
        }
        {...rest}
      >
        <div className="w-full rounded-lg py-3">
          <div className="flex flex-col">{optionsComponent}</div>
        </div>
      </CustomSelect>
    </div>
  );
}

export default SelectDesktop;
