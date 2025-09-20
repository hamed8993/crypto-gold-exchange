import { ArrayElement } from "@/core/constants/constants";
import { GetTicketsGetTickets } from "@/core/services/types";
import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import ItemDetail from "./components/itemDetail";

interface TicketItemProps {
  item: ArrayElement<GetTicketsGetTickets["result"]>;
  onClick: (item: ArrayElement<GetTicketsGetTickets["result"]>) => void;
}

const TicketItem = ({ item, onClick }: TicketItemProps) => {
  const t = useTranslations();
  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();

  return (
    <div
      onClick={() => onClick(item)}
      className="border-accentText50 hover:bg-secondBackground flex h-16 w-full cursor-pointer items-center justify-between rounded-lg border-[0.5px]"
    >
      <div
        className={clsx(
          "flex h-16 w-2 rounded-s-lg",
          item.status === "open" || item.status === "new"
            ? "bg-positive"
            : "bg-negative",
        )}
      />
      <div className="flex h-16 w-full items-center justify-between">
        <ItemDetail value={item.number} />
        <ItemDetail value={item.title} />
        <ItemDetail
          value={convertMillisecondToLocal(item.createdAt).date || "--"}
        />
        <ItemDetail
          className="hidden lg:flex"
          value={convertMillisecondToLocal(item.closedAt).date || "--"}
        />
        <ItemDetail isEnglish={false} value={t(item.status)} />
      </div>
    </div>
  );
};

export default TicketItem;
