import { useTranslations } from "next-intl";
import { CiSquareCheck } from "react-icons/ci";
import CustomButton from "../customButton";

interface GotItButtonProps {
  onClick: () => void;
}

function GotItButton({ onClick }: GotItButtonProps) {
  const t = useTranslations();
  return (
    <CustomButton
      onClick={onClick}
      variant="outlineNegative"
      className="flex w-[80px] min-h-10 items-center justify-center rounded-md bg-negative"
    >
      <div className="flex items-center justify-start gap-1">
        <CiSquareCheck className="h-5 w-5 text-negative" />
        <p dir="rtl" className="text-justify text-xs text-negative">
          {t("gotIt")}
        </p>
      </div>
    </CustomButton>
  );
}

export default GotItButton;
