import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { RxCross1 } from "react-icons/rx";

interface HeaderProps {
  setLeftBoxName: Dispatch<SetStateAction<"ticketChat" | "newChat" | "none">>;
}

function Header({ setLeftBoxName }: HeaderProps) {
  const t = useTranslations();
  return (
    <div className="border-b-accentText50 flex h-14 w-full items-center justify-between border-b p-2 pb-4">
      <div className="flex h-full items-center justify-start gap-2">
        <Image
          alt="chat"
          height={40}
          src={"/assets/images/new-message.png"}
          width={40}
        />
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-mainText text-xs">{t("newTicket")}</p>
          <p className="text-accentText text-xs">
            {t("enterNewTicketSescription")}
          </p>
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

export default Header;
