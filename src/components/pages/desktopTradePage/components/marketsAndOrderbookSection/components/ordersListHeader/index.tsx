import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { useTranslations } from "next-intl";

function OrdersListHeader() {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();

  const headers = [
    {
      id: "price",
      content: `${t("price")} (${getQuoteName("")})`,
      itemClassName: "justify-self-start",
    },
    {
      id: "amount",
      content: `${t("amount")} (${getQuoteName("")})`,
      itemClassName: "justify-self-center",
    },
    {
      id: "total",
      content: `${t("total")} (${getQuoteName("")})`,
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
        </div>
      ))}
    </div>
  );
}

export default OrdersListHeader;
