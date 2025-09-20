import clsx from "clsx";
import { useTranslations } from "next-intl";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export interface CustomSelectProps {
  wrapperClassName?: string;
  children: ReactNode;
  className?: string;
  togglerClassName?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  hasSearch?: boolean;
  isOpen: boolean;
  searchClassName?: string;
  searchOnChange?: (value: string) => void;
  searchPlaceholder?: string;
  label?: string;
  labelClassName?: string;
  valueComponent?: ReactNode;
  searchValue?: string;
  childrenClassName?: string;
}

const CustomSelect = ({
  wrapperClassName,
  children,
  className,
  setIsOpen,
  valueComponent,
  togglerClassName,
  label,
  labelClassName,
  hasSearch = false,
  isOpen,
  searchClassName,
  searchOnChange,
  searchPlaceholder,
  searchValue,
  childrenClassName,
}: CustomSelectProps) => {
  const t = useTranslations();

  const [width, setWidth] = useState<number>(400);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current) setWidth(parentRef.current.offsetWidth);

    function handleClickOutside(event: MouseEvent) {
      if (
        parentRef.current &&
        !parentRef.current.contains(event.target as Node)
      ) {
        searchOnChange?.("");
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentRef, parentRef?.current?.offsetWidth]);

  return (
    <div
      className={clsx(
        "flex w-[352px] flex-col items-start gap-3",
        wrapperClassName,
      )}
    >
      {label && (
        <label
          className={clsx(
            "text-textPlaceholder text-xs font-bold",
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <div ref={parentRef} className={clsx("relative w-full")}>
        <div
          className={clsx(
            "flex cursor-pointer items-center justify-center gap-2",
            togglerClassName,
          )}
          onClick={() => setIsOpen((prev: boolean) => !prev)}
        >
          <div
            className={clsx(
              "border-borderDefault text-textPrimary flex h-[52px] w-full items-center rounded-lg border-2 px-4 py-3",
              isOpen && "border-borderFocus",
            )}
          >
            {valueComponent}

            {!isOpen ? (
              <FaChevronDown className="text-textPrimary h-3.5 w-3.5" />
            ) : (
              <FaChevronUp className="text-textPrimary h-3.5 w-3.5" />
            )}
          </div>
        </div>

        <div
          className={clsx(
            "absolute start-0 bottom-0 flex w-4xl translate-y-full flex-col items-center justify-center rounded-lg shadow-xl",
            isOpen ? "z-20 flex" : "hidden",
            className,
          )}
          style={{ width }}
        >
          <div
            className={clsx(
              "bg-bgDefault w-full rounded-lg py-2",
              childrenClassName,
            )}
          >
            {hasSearch && (
              <div className="w-full px-3 py-2">
                <input
                  type="text"
                  placeholder={searchPlaceholder || t("search")}
                  className={clsx(
                    "border-border bg-mainBackground text-mainText focus:ring-mainText w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none",
                    searchClassName,
                  )}
                  onChange={(e) => {
                    searchOnChange?.(e.target.value);
                  }}
                  value={searchValue}
                />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
