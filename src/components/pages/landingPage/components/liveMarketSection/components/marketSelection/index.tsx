"use client";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface MarketSelectionProps {
  containerClassName?: string;
}

type SelectionItemType = {
  title: string;
  value: string;
};

function MarketSelection({ containerClassName }: MarketSelectionProps) {
  const t = useTranslations();

  const selectionItems: SelectionItemType[] = [
    {
      title: t("all"),
      value: "all",
    },
    {
      title: t("preciousMetals"),
      value: "preciousMetals",
    },
    {
      title: t("energies"),
      value: "energies",
    },
    {
      title: t("indexes"),
      value: "indexes",
    },

    {
      title: t("forex"),
      value: "forex",
    },
    {
      title: t("cfdIndex"),
      value: "cfdIndex",
    },
  ];

  const [selectedItem, setSelectedItem] = useState<SelectionItemType>(
    selectionItems[0],
  );

  const handleItemSelection = (item: { title: string; value: string }) => {
    setSelectedItem(item);
  };

  return (
    <div className={clsx("flex items-center gap-6", containerClassName)}>
      {selectionItems?.map((item) => (
        <button
          className={clsx(
            "text- flex items-center justify-center rounded-[100px] px-3 py-[6px] text-sm font-semibold",
            selectedItem?.value === item?.value
              ? "bg-newColor_textPrimary50 text-constantLight"
              : "text-textSecondary bg-transparent",
          )}
          type="button"
          onClick={() => handleItemSelection(item)}
          key={item?.value}
        >
          {item?.title}
        </button>
      ))}
    </div>
  );
}

export default MarketSelection;
