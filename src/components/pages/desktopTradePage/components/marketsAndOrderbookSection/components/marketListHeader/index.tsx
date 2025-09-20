import { useTranslations } from "next-intl";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export enum HeaderNameEnum {
  price = "price",
  market = "market",
  fluctuations = "fluctuations",
}

export type SortConfigType = {
  key: HeaderNameEnum;
  direction: "asc" | "desc";
} | null;

interface MarketListHeaderProps {
  sortConfig: SortConfigType;
  handleSort: (arg: HeaderNameEnum) => void;
}
function MarketListHeader({ sortConfig, handleSort }: MarketListHeaderProps) {
  const t = useTranslations();

  const headers = [
    {
      id: HeaderNameEnum.market,
      content: t("market"),
      itemClassName: "justify-self-start",
    },
    {
      id: HeaderNameEnum.price,
      content: t("price"),
      itemClassName: "justify-self-center",
    },
    {
      id: HeaderNameEnum.fluctuations,
      content: (
        <>
          {" "}
          <span>{t("fluctuations")}</span>
          <span className="font-english">24h</span>
        </>
      ),
      itemClassName: "justify-self-end",
    },
  ];

  return (
    <div className="grid h-[28px] w-full grid-cols-3">
      {headers?.map((item) => (
        <div
          key={item?.id}
          className={`flex h-full items-center gap-1 ${item.itemClassName}`}
        >
          <p className="text-textSecondary dark:text-textSecondary text-xs font-semibold">
            {item?.content}
          </p>
          <button
            onClick={() => handleSort(item.id)}
            type="button"
            className="flex flex-col gap-0"
          >
            <IoIosArrowUp
              className={`h-[10px] text-xs ${sortConfig?.key === item?.id && sortConfig?.direction === "asc" ? "text-textSuccess" : "text-textSecondary"}`}
            />
            <IoIosArrowDown
              className={`h-[10px] text-xs ${sortConfig?.key === item?.id && sortConfig?.direction === "desc" ? "text-textError" : "text-textSecondary"}`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default MarketListHeader;
