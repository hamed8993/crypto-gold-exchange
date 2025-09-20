import { useNotification } from "@/core/providers/notificationProvider";
import { useTranslations } from "next-intl";
import { MdContentCopy } from "react-icons/md";
import ReferralItemBox from "../referralItemBox";

interface DetailRowProps {
  title1: string;
  value1: string;
  title2: string;
  value2: string;
  hasIcon?: boolean;
  valueQuote?: string;
}

function DetailRow({
  title1,
  title2,
  value1,
  value2,
  hasIcon,
  valueQuote,
}: DetailRowProps) {
  const t = useTranslations();
  const { showSuccess } = useNotification();
  const handleCopy = (copyValue: string) => {
    navigator.clipboard.writeText(copyValue);
    showSuccess(t("successfullyCopied"));
  };

  return (
    <div className="my-2 flex w-full items-center justify-between gap-2">
      <ReferralItemBox valueQuote={valueQuote} title={title1} value={value1} />
      <ReferralItemBox
        title={title2}
        valueClassName={
          hasIcon ? "text-xs underline !text-mainBrandAlternative" : ""
        }
        value={hasIcon ? `goldfino...${value2.slice(-4)}` : value2}
        icon={
          hasIcon && (
            <MdContentCopy
              onClick={() => {
                handleCopy(value2);
              }}
              className="h-5 w-5 text-mainBrandAlternative "
            />
          )
        }
      />
    </div>
  );
}

export default DetailRow;
