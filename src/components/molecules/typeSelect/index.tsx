import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CustomSelect from "../../atoms/customSelect";

export type orderTypeType = "market" | "limit";

type typeObject = {
  value: orderTypeType | "all";
  label: string;
};

interface TypeSelectProps {
  onChange?: (value: string) => void;
  type?: orderTypeType | "all";
}

const TypeSelect = ({ onChange, type }: TypeSelectProps) => {
  const t = useTranslations();

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const typeArray: typeObject[] = [
    { value: "all", label: t("all") },
    { value: "limit", label: t("limit") },
    { value: "market", label: t("market") },
  ];

  const handleOnClick = (typeObject: typeObject) => {
    setIsSelectOpen(false);
    onChange?.(typeObject.value);
  };

  return (
    <CustomSelect
      toggler={
        <div className="flex w-full flex-col gap-2">
          <label className="mx-2 text-xs text-mainText dark:text-mainTextDark">
            {t("type")}
          </label>

          <div
            className={`dark:border-accentText50Dark flex h-9 w-full items-center self-end rounded-lg border border-accentText50 px-3 placeholder:text-accentText dark:placeholder:text-accentTextDark ${isSelectOpen && "border-mainText dark:border-mainTextDark"}`}
          >
            <p className="w-full text-mainText dark:text-mainTextDark">
              {type ? (
                t(type)
              ) : (
                <span className="text-xs text-accentText dark:text-accentTextDark">
                  {t("selectTheFilterOrder")}
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
      isVisible={isSelectOpen}
      childrenClassName="!bg-mainBackground dark:!bg-mainBackgroundDark border border-accentText50 dark:border-accentText50Dark"
      togglerClassName="px-0! pt-0"
    >
      <div className="w-full rounded-lg py-3">
        <div className="flex flex-col">
          {typeArray.map((type, index) => (
            <div
              key={index}
              className="flex h-10 cursor-pointer items-center px-2 hover:bg-surface dark:hover:bg-surfaceDark"
              onClick={() => {
                handleOnClick(type);
              }}
            >
              <p className="text-mainText dark:text-mainTextDark">
                {type.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </CustomSelect>
  );
};

export default TypeSelect;
