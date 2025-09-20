import { Side } from "@/core/services/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CustomSelect from "../../atoms/customSelect";

type sideObject = {
  value: "long" | "short" | "" | "all";
  label: string;
};
interface SideSelectProps {
  onChange?: (value: string) => void;
  side?: Side;
}

const SideSelect = ({ onChange, side }: SideSelectProps) => {
  const t = useTranslations();

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const SideArray: sideObject[] = [
    { value: "all", label: t("all") },
    { value: "short", label: t("short") },
    { value: "long", label: t("long") },
  ];

  const handleOnClick = (sideObject: sideObject) => {
    setIsSelectOpen(false);
    onChange?.(sideObject.value);
  };

  return (
    <CustomSelect
      toggler={
        <div className="flex w-full flex-col gap-2">
          <label className="mx-2 text-xs text-mainText dark:text-mainTextDark">
            {t("side")}
          </label>

          <div
            className={`flex h-9 w-full items-center self-end rounded-lg border border-accentText50 px-3 placeholder:text-accentText dark:border-accentTextDark50 dark:placeholder:text-accentTextDark ${isSelectOpen && "border-mainText dark:border-mainTextDark"}`}
          >
            <p className="w-full text-mainText dark:text-mainTextDark">
              {side ? (
                t(side)
              ) : (
                <span className="text-xs text-accentText dark:text-accentTextDark">
                  {t("selectTheFilterSide")}
                </span>
              )}
            </p>
            {!isSelectOpen ? (
              <FaChevronDown className="h-3.5 w-3.5 text-accentText dark:text-accentTextDark" />
            ) : (
              <FaChevronUp className="h-3.5 w-3.5 text-accentText dark:text-accentTextDark" />
            )}
          </div>
        </div>
      }
      setIsVisible={(isVisible) => setIsSelectOpen(isVisible)}
      childrenClassName="!bg-mainBackground dark:!bg-mainBackgroundDark border border-accentText50 dark:border-accentText50Dark"
      isVisible={isSelectOpen}
      togglerClassName="px-0! pt-0"
    >
      <div className="w-full rounded-lg py-3">
        <div className="flex flex-col">
          {SideArray.map((side, index) => (
            <div
              key={index}
              className="flex h-10 cursor-pointer items-center px-2 hover:bg-surface dark:hover:bg-surfaceDark"
              onClick={() => {
                handleOnClick(side);
              }}
            >
              <p className="text-mainText dark:text-mainTextDark">
                {side.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </CustomSelect>
  );
};

export default SideSelect;
