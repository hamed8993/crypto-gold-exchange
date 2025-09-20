import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import { useTranslations } from "next-intl";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
interface HelpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function HelpDrawer({ isOpen, onClose }: HelpDrawerProps) {
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
        <div className="mt-8 flex w-full items-center justify-end gap-2">
          <p dir="rtl" className="text-mainText text-justify text-lg">
            {t("oneTapTrade")}
          </p>
          <MdOutlineTipsAndUpdates className="text-negative h-5 w-5" />
        </div>
        <p dir="rtl" className="text-mainText w-[90%] text-justify text-xs/6">
          {t("onTapDescription")}
        </p>
        <CustomButton
          onClick={onClose}
          variant="outlineNegative"
          className="bg-negative flex w-[80px] items-center justify-center rounded-none"
        >
          <p dir="rtl" className="text-negative text-justify text-xs">
            {t("gotIt")}
          </p>
        </CustomButton>
      </div>
    </CustomDrawer>
  );
}

export default HelpDrawer;
