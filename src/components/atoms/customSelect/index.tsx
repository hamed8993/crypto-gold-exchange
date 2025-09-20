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

export interface CustomSelectProps {
  wrapperClassName?: string;
  toggler: ReactNode;
  children: ReactNode;
  className?: string;
  togglerClassName?: string;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  hasSearch?: boolean;
  isVisible: boolean;
  searchClassName?: string;
  searchOnChange?: (value: string) => void;
  searchPlaceholder?: string;
  searchValue?: string;
  childrenClassName?: string;
}

const CustomSelect = ({
  wrapperClassName,
  children,
  toggler,
  className,
  setIsVisible,
  togglerClassName,
  hasSearch = false,
  isVisible,
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
        setIsVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentRef, parentRef?.current?.offsetWidth]);

  return (
    <div ref={parentRef} className={clsx("relative w-full", wrapperClassName)}>
      <div
        className={clsx(
          "flex cursor-pointer items-center justify-center gap-2",
          togglerClassName,
        )}
        onClick={() => setIsVisible((prev: boolean) => !prev)}
      >
        {toggler}
      </div>
      <div
        className={clsx(
          "w-4xl absolute bottom-0 start-0 flex translate-y-full flex-col items-center justify-center rounded-lg shadow-sm",
          isVisible ? "z-20 flex" : "hidden",
          className,
        )}
        style={{ width }}
      >
        <div
          className={clsx(
            "w-full rounded-lg bg-surface py-2 dark:bg-surfaceDark",
            childrenClassName,
          )}
        >
          {hasSearch && (
            <div className="w-full px-3 py-2">
              <input
                type="text"
                placeholder={searchPlaceholder || t("search")}
                className={clsx(
                  "w-full rounded-lg border border-border bg-mainBackground px-3 py-2 text-mainText focus:outline-none focus:ring-2 focus:ring-mainText dark:border-borderDark dark:bg-mainBackgroundDark dark:text-mainTextDark",
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
  );
};

export default CustomSelect;
