import CustomButton from "@/components/atoms/customButton";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import { useTranslations } from "next-intl";

interface ConfirmButtonProps {
  isPending: boolean;
}

function ConfirmButton({ isPending }: ConfirmButtonProps) {
  const t = useTranslations();

  return (
    <StickyComponent className="bg-secondBackground flex w-full px-3">
      <div className="w-full py-2">
        <CustomButton
          className="bg-buttonPositive h-12 rounded-md"
          isLoading={isPending}
        >
          {t("confirm")}
        </CustomButton>
      </div>
    </StickyComponent>
  );
}

export default ConfirmButton;
