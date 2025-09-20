import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import { useTranslations } from "next-intl";
import { CiSquareCheck } from "react-icons/ci";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
interface PnlTabHelpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function PnlTabHelpDrawer({ isOpen, onClose }: PnlTabHelpDrawerProps) {
  const t = useTranslations();
  return (
    <CustomDrawer
      isOpen={isOpen}
      onClose={onClose}
      hasCross={false}
      height="fit-content min-h-96"
    >
      <div className="flex h-72 flex-col items-center justify-between px-8 py-2 pb-4">
        <div className="bg-accentText flex h-1 w-20 rounded-full"></div>
        <div className="mt-8 flex w-full items-center justify-start gap-2">
          <MdOutlineTipsAndUpdates className="text-negative h-5 w-5" />
          <p dir="rtl" className="text-mainText text-justify text-sm">
            {t("editQuantities")}
          </p>
        </div>
        <p dir="rtl" className="text-accentText w-[90%] text-justify text-xs/6">
          {t("editPositionHelpDescription2")}
        </p>
        <p dir="rtl" className="text-accentText w-[90%] text-justify text-xs/6">
          {t("editPositionHelpDescription22")}
        </p>

        <CustomButton
          onClick={onClose}
          variant="outlineNegative"
          className="bg-negative flex w-[80px] items-center justify-center rounded-md"
        >
          <div className="flex items-center justify-start gap-1">
            <CiSquareCheck className="text-negative h-5 w-5" />
            <p dir="rtl" className="text-negative text-justify text-xs">
              {t("gotIt")}
            </p>
          </div>
        </CustomButton>
      </div>
    </CustomDrawer>
  );
}

export default PnlTabHelpDrawer;
