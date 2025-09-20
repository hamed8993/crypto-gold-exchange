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
    <div className="bg-surfaceBg divide-accentText50 divide-y rounded-lg p-3">
      <div className="grid grid-cols-3 grid-rows-1 gap-1">
        <div className="flex gap-4">
          <p className="text-accentText text-sm">{t("time")}:</p>
          <p dir="ltr" className="font-english text-mainText text-sm">
            {convertMillisecondToLocal(data?.time).dateTime}
          </p>
        </div>
        <div className="flex w-full justify-start gap-4">
          <p className="text-accentText text-sm">{t("ipAddress")}:</p>
          <p className="font-english text-mainText text-sm">{data?.ip}</p>
        </div>
        <div className="flex w-full justify-start gap-4">
          <p className="text-accentText text-sm">{t("platform")}:</p>
          <p className="text-mainText text-sm">{data?.agent}</p>
        </div>
      </div>
    </div>
  );
}

export default LastLoginBox;
