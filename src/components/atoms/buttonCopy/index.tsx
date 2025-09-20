"use client";

import { useNotification } from "@/core/providers/notificationProvider";
import { useTranslations } from "next-intl";
import { MdContentCopy } from "react-icons/md";

interface CopyButtonProps {
  copyValue: string;
}

const CopyButton = ({ copyValue }: CopyButtonProps) => {
  const t = useTranslations();
  const { showSuccess } = useNotification();

  const handleCopy = () => {
    navigator.clipboard.writeText(copyValue);
    showSuccess(t("successfullyCopied"));
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs"
    >
      <MdContentCopy
        className="text-accentText dark:text-accentTextDark"
        size={16}
      />
    </button>
  );
};

export default CopyButton;
