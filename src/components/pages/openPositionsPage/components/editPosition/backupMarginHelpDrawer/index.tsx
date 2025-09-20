import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

interface BackupMarginHelpDrawerProps {
  isOpen: boolean;
  pl_multiplier: string | number;
  currentPrice: string | number;
  priceStep: string | number;
  quote: string | number;
  onClose: () => void;
}

function BackupMarginHelpDrawer({
  isOpen,
  priceStep,
  onClose,
  pl_multiplier,
  currentPrice,
  quote,
}: BackupMarginHelpDrawerProps) {
  const t = useTranslations();
  return (
    <CustomDrawer
      isOpen={isOpen}
      onClose={onClose}
      hasCross={false}
      height="fit-content "
    >
      <div className="flex flex-col items-center justify-between px-8 py-2 pb-4">
        <div className="bg-accentText flex h-1 w-20 rounded-full"></div>
        <div className="mt-8 flex w-full items-center justify-start gap-2">
          <MdOutlineTipsAndUpdates className="text-negative h-5 w-5" />
          <p dir="" className="text-mainText text-justify text-lg">
            {t("backupMargin")}
          </p>
        </div>
        <p
          dir="rtl"
          className="text-mainText mt-2 w-[90%] text-justify text-xs/6"
        >
          {t("backupMarginDescription")}
        </p>
        <p dir="rtl" className="text-mainText w-[90%] text-justify text-xs/6">
          {t("backupMarginDescription4")}
        </p>
        <p dir="rtl" className="text-mainText w-[90%] text-justify text-xs/6">
          {t("backupMarginDescription3", {
            pl_multiplier: `${addCommaSeparator(pl_multiplier)} ${quote === "irt" ? t("irtSymbol") : t("tetherSymbol")}`,
            liq_price: `${addCommaSeparator(priceStep)} ${quote === "irt" ? t("irtSymbol") : t("tetherSymbol")}`,
          })}
        </p>
        <p
          dir="rtl"
          className="text-mainText mt-2 w-[90%] text-justify text-xs/6"
        >
          {t("backupMarginDescription2")}
        </p>
        <p
          dir="rtl"
          className="text-mainText mt-2 mb-3 w-[90%] text-justify text-xs/6"
        >
          {t("backupMarginDescription5", {
            market_price: addCommaSeparator(currentPrice),
            pl_multiplier: addCommaSeparator(pl_multiplier),
            new_liq_price: addCommaSeparator(priceStep),
          })}
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

export default BackupMarginHelpDrawer;
