import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import ContinueButton from "../continueButton";

function ButtonsRow() {
  const t = useTranslations();

  return (
    <div className="mt-8 flex w-[444px] items-center justify-between">
      <ContinueButton />
      <ButtonDefault
        className="flex h-12! items-center justify-center bg-transparent px-6"
        variant="outline"
      >
        <p className="text-sm text-textPrimary">{t("haveNotAccessToCode")}</p>
      </ButtonDefault>
    </div>
  );
}

export default ButtonsRow;
