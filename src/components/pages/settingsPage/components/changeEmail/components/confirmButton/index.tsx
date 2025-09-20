import CustomButton from "@/components/atoms/customButton";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import { useTranslations } from "next-intl";

interface ConfirmButtonProps {
  isPendingChangeEmail: boolean;
}

function ConfirmButton({ isPendingChangeEmail }: ConfirmButtonProps) {
  const t = useTranslations();

  return (
    <StickyComponent className="bg-secondBackground flex w-full px-3 pt-3">
      <div className="w-full py-4">
        <CustomButton
          className="bg-buttonPositive h-12 rounded-md"
          isLoading={isPendingChangeEmail}
        >
          {t("confirm")}
        </CustomButton>
      </div>
    </StickyComponent>
  );
}

export default ConfirmButton;
