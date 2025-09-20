import { useNotification } from "@/core/providers/notificationProvider";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { IoMdCopy } from "react-icons/io";

interface HeaderBoxProps {
  title: string | number;
  isEnglish?: boolean;
  isLink?: boolean;
  className?: string;
  openModal?: () => void;
}

function HeaderBox({
  title,
  isEnglish,
  isLink,
  className,
  openModal,
}: HeaderBoxProps) {
  const t = useTranslations();
  const { showSuccess } = useNotification();

  const handleCopy = (copyValue: string) => {
    navigator.clipboard.writeText(copyValue);
    showSuccess(t("successfullyCopied"));
  };

  return isLink ? (
    <div
      className={clsx(
        "flex w-full items-center justify-start gap-2",
        className,
      )}
    >
      <p
        onClick={() => {
          handleCopy(title?.toString());
        }}
        className={clsx(
          "cursor-pointer text-sm text-mainBrandAlternative underline",
          isEnglish ? "font-english" : "",
        )}
      >
        {title}
      </p>
      <IoMdCopy
        onClick={() => {
          handleCopy(title?.toString());
        }}
        className="cursor-pointer text-lg text-mainBrandAlternative"
      />
    </div>
  ) : (
    <div
      onClick={openModal}
      className={clsx("w-full items-center justify-start", className)}
    >
      <p
        className={clsx(
          "text-sm text-mainText dark:text-mainTextDark",
          isEnglish ? "font-english" : "",
        )}
      >
        {title}
      </p>
    </div>
  );
}

export default HeaderBox;
