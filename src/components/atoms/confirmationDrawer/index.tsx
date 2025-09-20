import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import { useTranslations } from "next-intl";

interface ConfirmationDrawerProps {
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmationDrawer({
  isOpen,
  onClose,
  onConfirm,
  isPending,
}: ConfirmationDrawerProps) {
  const t = useTranslations();

  return (
    <CustomDrawer
      isOpen={isOpen}
      onClose={onClose}
      hasCross={false}
      height="fit-content min-h-[500px]"
    >
      <div className="flex flex-col items-center justify-between px-8 py-2 pb-8">
        <div className="mt-1 flex h-1 w-[40%] bg-accentText50 dark:bg-accentTextDark50"></div>
        <p className="my-10 text-sm text-mainText dark:text-mainTextDark">
          {t("areYouSure")}
        </p>
        <div className="flex h-28 w-full flex-col items-center justify-between">
          <CustomButton
            onClick={onConfirm}
            isDisabled={isPending}
            isLoading={isPending}
            variant="outline"
            className="flex h-12 w-full items-center justify-center rounded-md"
          >
            <p dir="rtl" className="text-justify text-xs text-positive">
              {t("confirm")}
            </p>
          </CustomButton>
          <CustomButton
            isDisabled={isPending}
            onClick={onClose}
            variant="outlineNegative"
            className="flex h-12 w-full items-center justify-center rounded-md bg-negative"
          >
            <p dir="rtl" className="text-justify text-xs text-negative">
              {t("cancel")}
            </p>
          </CustomButton>
        </div>
      </div>
    </CustomDrawer>
  );
}

export default ConfirmationDrawer;
