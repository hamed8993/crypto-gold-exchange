import { ArrayElement } from "@/core/constants/constants";
import { GetTicketsGetTickets } from "@/core/services/types";
import { Dispatch, SetStateAction } from "react";
import ChatHeader from "../chatHeader";
import TicketChatDetail from "../ticketChatDetail";
import UserInputBox from "../userInputBox";

interface SelectedTicketBoxProps {
  setLeftBoxName: Dispatch<SetStateAction<"ticketChat" | "newChat" | "none">>;
  selectedItem: ArrayElement<GetTicketsGetTickets["result"]>;
}

function SelectedTicketBox({
  setLeftBoxName,
  selectedItem,
}: SelectedTicketBoxProps) {
  return (
    <div className="bg-surface flex h-full w-full flex-col items-center justify-between rounded-xl p-2">
      <div className="flex h-full w-full flex-col items-center justify-start gap-2 p-2">
        <ChatHeader
          description={selectedItem?.number}
          title={selectedItem?.title}
          setLeftBoxName={setLeftBoxName}
        />
        <TicketChatDetail ticket_number={selectedItem?.number} />
      </div>
      <UserInputBox ticket_number={selectedItem?.number} />
    </div>
  );
}

export default SelectedTicketBox;
