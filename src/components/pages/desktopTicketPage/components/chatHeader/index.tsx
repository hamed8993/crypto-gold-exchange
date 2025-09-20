import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { RxCross1 } from "react-icons/rx";

interface ChatHeaderProps {
  setLeftBoxName: Dispatch<SetStateAction<"ticketChat" | "newChat" | "none">>;
  title: string;
  description: string;
}

function ChatHeader({ setLeftBoxName, description, title }: ChatHeaderProps) {
  return (
    <div className="border-b-accentText50 flex h-14 w-full items-center justify-between border-b p-2 pb-4">
      <div className="flex h-full items-center justify-start gap-2">
        <Image
          alt="chat"
          height={50}
          src={"/assets/images/support.png"}
          width={50}
        />
        <div className="flex flex-col items-start justify-start">
          <p className="text-mainText text-xs">{title}</p>
          <p className="font-english text-mainText text-xs">{description}</p>
        </div>
      </div>
      <div
        onClick={() => {
          setLeftBoxName("none");
        }}
        className="flex h-10 w-10 cursor-pointer items-center justify-center"
      >
        <RxCross1 className="text-accentText text-lg" />
      </div>
    </div>
  );
}

export default ChatHeader;
