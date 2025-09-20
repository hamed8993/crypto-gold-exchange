"use client";

import EmptyView from "@/components/atoms/emptyView";
import LoadingView from "@/components/atoms/loadingView";
import TableDefaultFoot from "@/components/molecules/tableDefault/tableParts/tableDefaultFoot";
import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import { ArrayElement } from "@/core/constants/constants";
import { usePagination } from "@/core/hooks/usePagination";
import { useWindowSize } from "@/core/providers/windowSize";
import { useGetTickets } from "@/core/services/hooks";
import { GetTicketsGetTickets } from "@/core/services/types";
import clsx from "clsx";
import { useState } from "react";
import ListHeader from "./components/listHeader";
import NewTicket from "./components/newTicket";
import SelectedTicketBox from "./components/selectedTicketBox";
import TicketIntroduceBox from "./components/ticketIntroduceBox";
import TicketItem from "./components/ticketItem";

interface DesktopTicketPageProps {
  className?: string;
}

function DesktopTicketPage({ className }: DesktopTicketPageProps) {
  const { width } = useWindowSize();
  const { maxRowsPerPage, page, setMaxRowsPerPage, setPage } = usePagination();

  const { data, isPending } = useGetTickets({ maxRowsPerPage, page });
  const ticketsList = data?.result;

  const [selectedItem, setSelectedItem] =
    useState<ArrayElement<GetTicketsGetTickets["result"]>>();

  const [leftBoxName, setLeftBoxName] = useState<
    "ticketChat" | "newChat" | "none"
  >("ticketChat");

  return (
    <DesktopPageLayout
      hasSideMenu={width > 1100}
      hasFooter={false}
      hasHeader={true}
      className={clsx(className, "overflow-y-hidden!")}
    >
      <div className="flex h-full w-full items-center justify-between overflow-y-hidden!">
        <div className="flex h-full! w-full flex-col items-center justify-start gap-4 p-4">
          <TicketIntroduceBox setLeftBoxName={setLeftBoxName} />
          <div className="bg-surface flex h-full w-full flex-col gap-2 rounded-xl p-2">
            <ListHeader />
            {isPending ? (
              <LoadingView />
            ) : ticketsList && Number(ticketsList?.length) > 0 ? (
              <>
                {ticketsList?.reverse()?.map((item, index) => {
                  return (
                    <TicketItem
                      onClick={(item) => {
                        setSelectedItem(item);
                        setLeftBoxName("ticketChat");
                      }}
                      item={item}
                      key={index}
                    />
                  );
                })}
                <div className="flex w-full items-center justify-center">
                  <TableDefaultFoot
                    lastPage={data?.paginationData?.lastPage}
                    pagination={{
                      maxRowsPerPage,
                      page,
                      setMaxRowsPerPage,
                      setPage,
                    }}
                  />
                </div>
              </>
            ) : (
              <EmptyView />
            )}
          </div>
        </div>
        <div className="flex h-full w-[700px]! flex-col items-center justify-start p-4">
          {leftBoxName === "newChat" ? (
            <NewTicket setLeftBoxName={setLeftBoxName} />
          ) : leftBoxName === "ticketChat" ? (
            selectedItem && (
              <SelectedTicketBox
                selectedItem={selectedItem}
                setLeftBoxName={setLeftBoxName}
              />
            )
          ) : null}
        </div>
      </div>
    </DesktopPageLayout>
  );
}
export default DesktopTicketPage;
