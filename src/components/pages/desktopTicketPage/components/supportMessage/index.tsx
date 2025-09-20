import Link from "next/link";
import { BiDownload } from "react-icons/bi";

interface SupportMessageProps {
  message: string;
  time: string;
  attachments: {
    fileName: string;
    uuid: string;
  }[];
}

const SupportMessage = ({
  message,
  time,
  attachments,
}: SupportMessageProps) => {
  return (
    <div className="bg-userChatBackground flex h-fit w-full flex-col items-center justify-end rounded-xl rounded-bl-none p-3">
      <p dir="ltr" className="text-mainText w-full text-end text-sm break-all">
        {message}
      </p>
      {attachments.length !== 0 &&
        attachments.map((item) => {
          return (
            <Link
              key={item.uuid}
              className="border-accentText50 mt-1 flex w-full items-center justify-start gap-2 rounded-lg border p-1 px-2"
              href={`${process.env.NEXT_PUBLIC_API_URL}/tickets/download_attachment?uuid=${item.uuid}`}
              target="_blank"
            >
              <BiDownload color="white" size={20} />
              <p className="w-full text-start text-xs break-all text-white">
                {item.fileName}
              </p>
            </Link>
          );
        })}
      <p className="font-english text-landingAccentText mt-2 self-start text-xs break-all">
        {time}
      </p>
    </div>
  );
};

export default SupportMessage;
