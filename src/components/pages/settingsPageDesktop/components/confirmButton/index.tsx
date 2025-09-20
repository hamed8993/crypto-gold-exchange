import CustomButton from "@/components/atoms/customButton";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface ConfirmButtonProps {
  isPendingChangeEmail: boolean;
  containerClassName?: string;
}

function ConfirmButton({
  isPendingChangeEmail,
  containerClassName,
}: ConfirmButtonProps) {
  const t = useTranslations();

  return (
    <div className={clsx("mt-auto w-full pt-4", containerClassName)}>
      <CustomButton
        className="h-12 rounded-md bg-buttonPositive"
        isLoading={isPendingChangeEmail}
      >
        {t("confirm")}
      </CustomButton>
    </div>
  );
}

export default ConfirmButton;
