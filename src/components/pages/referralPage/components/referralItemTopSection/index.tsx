import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { FaPeopleLine } from "react-icons/fa6";

interface ReferralItemTopSectionProps {
  income: string;
  referralCode: string;
}

function ReferralItemTopSection({
  income,
  referralCode,
}: ReferralItemTopSectionProps) {
  const t = useTranslations();
  return (
    <div className="flex items-center justify-start gap-3 p-3">
      <div className="bg-surface flex items-center justify-center rounded-full p-3">
        <FaPeopleLine className="text-accentText h-7 w-7" />
      </div>
      <div className="flex flex-col items-start justify-start gap-2">
        <div className="flex items-center justify-start gap-1">
          <p className="text-accentText text-justify text-sm">
            {`${t("referralCode")}${": "}`}
          </p>
          <p className="font-english text-mainText text-justify text-[16px]">
            {`${referralCode} `}
          </p>
        </div>
        <div className="flex items-center justify-start gap-1">
          <p className="text-accentText text-justify text-xs">
            {`${t("income")}${": "}`}
          </p>
          <p className="font-english text-positive text-justify text-[16px]">
            {`${addCommaSeparator(income)}`}
          </p>
          <p className="text-accentText text-justify text-xs">
            {`${t("irtSymbol")} `}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReferralItemTopSection;
