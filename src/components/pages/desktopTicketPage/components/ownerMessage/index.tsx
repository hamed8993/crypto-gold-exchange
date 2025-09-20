import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import Link from "next/link";
import { BiDownload } from "react-icons/bi";

interface OwnerMessageProps {
  message: string;
  attachments: {
    fileName: string;
    uuid: string;
  }[];
  time: string;
}

const OwnerMessage = ({ message, time, attachments }: OwnerMessageProps) => {
  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();
  return (
    <div className="bg-ownerChatBackground flex h-fit w-full flex-col items-center justify-start rounded-xl rounded-br-none p-3">
      <p className="w-full text-start text-sm break-all text-white">
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
      <p className="font-english text-landingAccentText mt-2 self-end text-xs break-all">
        {convertMillisecondToLocal(time).hoursAndMinutes}
      </p>
    </div>
  );
};

export default OwnerMessage;
