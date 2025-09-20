import { useTransactionsHistoryContext } from "@/components/pages/transactionHistoryPage/provider";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface TabProps {
  value: "deposit" | "withdraw";
}

function Tab({ value }: TabProps) {
  const t = useTranslations();
  const { watch, setValue, reset } = useTransactionsHistoryContext();

  const activeTab = watch("activeTab");
  const isFilterApplied = watch("isFilterApplied");

  return (
    <div
      className={clsx(
        "flex h-10 w-full cursor-pointer items-center justify-center border-b-2",
        activeTab === value ? "border-mainBrand" : "border-accentText50",
      )}
      onClick={() => {
        reset();
        setValue("isFilterApplied", !isFilterApplied);
        setValue("activeTab", value);
      }}
    >
      <p
        className={clsx(
          "text-sm",
          activeTab === value ? "text-mainBrand" : "text-mainText",
        )}
      >
        {t(value)}
      </p>
    </div>
  );
}

export default Tab;
