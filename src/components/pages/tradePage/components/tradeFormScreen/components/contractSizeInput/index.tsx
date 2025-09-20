import { useTradeContext } from "@/components/pages/tradePage/provider";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import EditableNumInput from "../EditableNumInput";

function ContractSizeInput() {
  const t = useTranslations();
  const { control, errors } = useTradeContext();

  return (
    <Controller
      control={control}
      name="contractSize"
      render={({ field }) => {
        return (
          <EditableNumInput
            error={errors?.contractSize?.message}
            isEditable
            label={t("contractSize")}
            {...field}
          />
        );
      }}
      rules={{ required: t("contractIsNotValid") }}
    />
  );
}

export default ContractSizeInput;
