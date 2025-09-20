import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import { useTranslations } from "next-intl";

interface LastLoginBoxProps {
  data?: {
    ip: string;
    time: string;
    agent: string;
  };
}

function LastLoginBox({ data }: LastLoginBoxProps) {
  const t = useTranslations();

  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();

  return (
    <div className="bg-secondBackground rounded-lg p-3">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-start gap-1">
          <div className="flex gap-4">
            <p className="text-accentText text-sm">{t("time")}:</p>
            <p dir="ltr" className="font-english text-mainText text-sm">
              {convertMillisecondToLocal(data?.time).dateTime}
            </p>
          </div>
          <div className="mt-1 flex gap-4">
            <p className="text-accentText text-sm">{t("ipAddress")}:</p>
            <p className="font-english text-mainText text-sm">{data?.ip}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-2 flex gap-4">
          <p className="text-accentText text-sm">{t("platform")}:</p>
          <p className="text-mainText text-sm">{data?.agent}</p>
        </div>
      </div>
    </div>
  );
}

export default LastLoginBox;
