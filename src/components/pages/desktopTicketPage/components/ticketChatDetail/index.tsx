import LoadingView from "@/components/atoms/loadingView";
import { useGetTicketsGet_ticket_data } from "@/core/services/hooks";
import { useEffect, useRef } from "react";
import OwnerMessage from "../ownerMessage";
import SupportMessage from "../supportMessage";

interface TicketChatDetailProps {
  ticket_number: string | number;
}

function TicketChatDetail({ ticket_number }: TicketChatDetailProps) {
  const { data, isPending } = useGetTicketsGet_ticket_data({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    ticket_number: ticket_number?.toString(),
  });
  const chats = data?.result?.articles;

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <div className="bg-secondBackground flex h-full w-full flex-col gap-5 overflow-y-auto rounded-xl p-4">
      {isPending ? (
        <LoadingView />
      ) : (
        chats?.map((item, index) => {
          return item?.creator_type === "customer" ? (
            <OwnerMessage
              attachments={item?.attachments}
              key={index}
              message={item?.message}
              time={item?.createdAt}
            />
          ) : (
            <SupportMessage
              key={index}
              attachments={item?.attachments}
              message={item?.message}
              time={item?.createdAt}
            />
          );
        })
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
}

export default TicketChatDetail;
