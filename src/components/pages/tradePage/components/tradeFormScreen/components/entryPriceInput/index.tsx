import { useTradeContext } from "@/components/pages/tradePage/provider";
import { useFirstBidAsk } from "@/core/providers/firstBidAskProvider";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import EditableNumInput from "../EditableNumInput";

interface EntryPriceInputProps {
  symbol: string;
  priceStep: string | number;
}

function EntryPriceInput({ priceStep, symbol }: EntryPriceInputProps) {
  const t = useTranslations();

  const { firstBidAsk } = useFirstBidAsk();

  const { watch, control, errors } = useTradeContext();

  return (
    <>
      {watch("orderType") === "pending" && (
        <Controller
          control={control}
          name="entryPrice"
          render={({ field }) => {
            return (
              <EditableNumInput
                defaultValue={Number(firstBidAsk?.[symbol]?.flong)}
                error={errors?.entryPrice?.message}
                isEditable
                label={t("entryPrice")}
                placeholder={t("enterPrice")}
                step={Number(priceStep)}
                {...field}
              />
            );
          }}
          rules={{ required: t("priceIsNotValid") }}
        />
      )}
    </>
  );
}

export default EntryPriceInput;
