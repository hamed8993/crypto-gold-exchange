"use client";

import CustomButton from "@/components/atoms/customButton";
import PwaPageLayout from "@/components/organisms/layout";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { SlUser } from "react-icons/sl";
import NewTicketDrawer from "./components/newTicketDrawer";

const ticketData = [
  {
    name: "John Doe",
    number: "TCK-1001",
    timestamp: 1693555200000,
    status: "new",
  },
  {
    name: "Alice Smith",
    number: "TCK-1002",
    timestamp: 1693641600000,
    status: "open",
  },
  {
    name: "Bob Johnson",
    number: "TCK-1003",
    timestamp: 1693728000000,
    status: "closed",
  },
  {
    name: "Emma Brown",
    number: "TCK-1004",
    timestamp: 1693814400000,
    status: "new",
  },
  {
    name: "Michael Wilson",
    number: "TCK-1005",
    timestamp: 1693900800000,
    status: "open",
  },
  {
    name: "Sophia Miller",
    number: "TCK-1006",
    timestamp: 1693987200000,
    status: "closed",
  },
  {
    name: "Daniel Martinez",
    number: "TCK-1007",
    timestamp: 1694073600000,
    status: "open",
  },
  {
    name: "Olivia Taylor",
    number: "TCK-1008",
    timestamp: 1694160000000,
    status: "closed",
  },
  {
    name: "James Anderson",
    number: "TCK-1009",
    timestamp: 1694246400000,
    status: "new",
  },
  {
    name: "Charlotte Thomas",
    number: "TCK-1010",
    timestamp: 1694332800000,
    status: "open",
  },
];

interface TicketPageProps {
  className?: string;
}

function TicketPage({ className }: TicketPageProps) {
  const t = useTranslations();
  const { locale } = useUrl();
  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();

  const [isNewTicketDrawerOpen, setIsNewTicketDrawerOpen] =
    useState<boolean>(false);

  const newTicketDrawerOpenHandler = () => {
    setIsNewTicketDrawerOpen(true);
  };

  const newTicketDrawerCloseHandler = () => {
    setIsNewTicketDrawerOpen(false);
  };

  return (
    <PwaPageLayout
      wrapperClassName={className}
      hasBackChevron
      hasFooter={false}
      title={t("ticket")}
    >
      <div className="flex flex-1 flex-col justify-between overflow-hidden shadow-none">
        <div className="h-[calc(100vh-105px)] w-full space-y-4 overflow-y-auto">
          {ticketData.map((item) => {
            return (
              <Link
                className="bg-surface flex cursor-pointer items-center justify-between rounded-lg p-2"
                key={item.number}
                href={`/${locale}${RoutesName.tickets}/${item.number}`}
                prefetch
              >
                <span className="flex items-center gap-2">
                  <SlUser className="text-mainBrand h-5 w-5" />
                  <span className="flex flex-col items-start gap-1">
                    <span className="text-mainText text-lg">{item.name}</span>
                    <span className="text-accentText text-sm">
                      {item.number}
                    </span>
                  </span>
                </span>
                <span className="flex flex-col items-end gap-2">
                  <span dir="ltr" className="text-mainText text-sm">
                    {convertMillisecondToLocal(item.timestamp).dateTime}
                  </span>
                  <span
                    className={clsx(
                      "text-mainText rounded-lg px-2 pt-1 text-xs leading-none",
                      item.status === "new"
                        ? "bg-mainBrandAlternative/50"
                        : item.status === "open"
                          ? "bg-mainBrand/50"
                          : "bg-accentText/50",
                    )}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
        <div className="my-2 h-fit w-full">
          <CustomButton onClick={newTicketDrawerOpenHandler}>
            {t("newTicket")}
          </CustomButton>
        </div>
      </div>

      <NewTicketDrawer
        isOpen={isNewTicketDrawerOpen}
        onClose={newTicketDrawerCloseHandler}
      />
    </PwaPageLayout>
  );
}

export default TicketPage;
