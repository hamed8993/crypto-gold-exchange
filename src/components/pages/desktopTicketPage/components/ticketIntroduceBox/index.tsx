import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { GoPlusCircle } from "react-icons/go";

interface TicketIntroduceBoxProps {
  setLeftBoxName: Dispatch<SetStateAction<"ticketChat" | "newChat" | "none">>;
}

function TicketIntroduceBox({ setLeftBoxName }: TicketIntroduceBoxProps) {
  const t = useTranslations();

  return (
    <div className="bg-surface flex h-36 w-full items-center justify-between gap-2 rounded-xl p-4">
      <div className="flex h-full items-center justify-start gap-2">
        <Image
          alt="chat"
          className="hidden lg:flex"
          height={80}
          src={"/assets/images/bubble-chat.webp"}
          width={80}
        />
        <div className="flex h-full flex-col items-start justify-center gap-2">
          <p className="text-mainText text-xl">{t("ticketTitle")}</p>
          <p className="text-accentText text-sm">{t("ticketDescription")}</p>
        </div>
      </div>
      <div className="flex h-full flex-col items-center justify-end">
        <div
          onClick={() => {
            setLeftBoxName("newChat");
          }}
          className="bg-positive flex h-10 w-32 cursor-pointer items-center justify-center gap-1 rounded-lg"
        >
          <GoPlusCircle color="white" className="text-lg" />

          <p className="text-xs text-white">{t("newTicket")}</p>
        </div>
      </div>
    </div>
  );
}

export default TicketIntroduceBox;
