import CustomButton from "@/components/atoms/customButton";
import { useTranslations } from "next-intl";

interface CopyShareButtonProps {
  onShareClick?: () => void;
  onCopyClick?: () => void;
}

function CopyShareButton({ onCopyClick, onShareClick }: CopyShareButtonProps) {
  const t = useTranslations();

  return (
    <div className="mt-4 flex w-full items-center justify-between gap-2 px-10">
      <CustomButton onClick={onShareClick} variant="primary">
        <p className="text-xs text-mainText dark:text-mainTextDark">
          {t("share")}
        </p>
      </CustomButton>
      <CustomButton onClick={onCopyClick} variant="mainBrandOutline">
        <p className="text-xs text-mainText dark:text-mainTextDark">
          {t("copy")}
        </p>
      </CustomButton>
    </div>
  );
}

export default CopyShareButton;
