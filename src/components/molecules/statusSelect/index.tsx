import { Status, StatusOrder } from "@/core/services/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CustomSelect from "../../atoms/customSelect";

interface StatusSelectProps {
  onChange?: (value: string) => void;
  status?: Status | StatusOrder;
}

type statusObject = {
  value: StatusOrder | "all";
  label: string;
};

const StatusSelect = ({ onChange, status }: StatusSelectProps) => {
  const t = useTranslations();

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const statusArray: statusObject[] = [
    { value: "all", label: t("all") },
    { value: "canceled", label: t("canceled") },
    { value: "completed", label: t("completed") },
    { value: "pending", label: t("pending") },
  ];

  const handleOnClick = (statusObject: statusObject) => {
    setIsSelectOpen(false);
    onChange?.(statusObject.value);
  };

  return (
    <CustomSelect
      toggler={
        <div className="flex w-full flex-col gap-2">
          <label className="mx-2 text-xs text-mainText dark:text-mainTextDark">
            {t("status")}
          </label>

          <div
            className={`dark:border-accentText50Dark flex h-9 w-full items-center self-end rounded-lg border border-accentText50 px-3 placeholder:text-accentText dark:placeholder:text-accentTextDark ${isSelectOpen && "border-mainText dark:border-mainTextDark"}`}
          >
            <p className="w-full text-mainText dark:text-mainTextDark">
              {status ? (
                t(status)
              ) : (
                <span className="text-xs text-accentText dark:text-accentTextDark">
                  {t("selectTheFilterStatus")}
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
      <div className="bg-subtleBackground dark:bg-mainDark w-full rounded-lg py-3">
        <div className="flex flex-col">
          {statusArray.map((status, index) => (
            <div
              key={index}
              className="flex h-10 cursor-pointer items-center px-2 hover:bg-surface dark:hover:bg-surfaceDark"
              onClick={() => {
                handleOnClick(status);
              }}
            >
              <p className="text-mainText dark:text-mainTextDark">
                {status.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </CustomSelect>
  );
};

export default StatusSelect;
