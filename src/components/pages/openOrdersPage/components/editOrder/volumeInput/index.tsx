import CustomInput from "@/components/atoms/customInput";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { addInputCommaSeparator } from "@/core/utilities/addInputCommaSeparator";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useEditOrderContext } from "../provider";

interface VolumeInputProps {
  quoteAsset: string;
}

function VolumeInput({ quoteAsset }: VolumeInputProps) {
  const t = useTranslations();
  const { watch, setValue } = useEditOrderContext();
  const contractSize = watch("contractSize");
  const entryPrice = watch("entryPrice");
  return (
    <div className="bg-surface mt-2 flex w-full flex-col items-center justify-start p-4 py-8">
      <div className="flex w-full items-center justify-between">
        <p className="text-mainText w-[20%] max-w-[20%] text-lg font-bold">
          {t("volume")}
        </p>
        <CustomInput
          inputMode="decimal"
          placeholder="--,----"
          maxLength={15}
          onChange={(e) =>
            setValue("contractSize", addInputCommaSeparator(e.target))
          }
          value={contractSize}
          wrapperClassName="max-w-[40%]"
          inputClassName="font-english border-none text-center! text-lg!"
        />

        <div className="bg-secondBackground flex h-8 w-24 max-w-[40%] items-center justify-between rounded-lg">
          <div
            onClick={() => {
              setValue("contractSize", (Number(contractSize) + 1).toString());
            }}
            className="flex h-8 w-10 items-center justify-center"
          >
            <FiPlus className="text-mainText h-6 w-6" />
          </div>
          <div
            onClick={() => {
              if (Number(contractSize) > 0) {
                setValue("contractSize", (Number(contractSize) - 1).toString());
              }
            }}
            className="flex h-8 w-10 items-center justify-center"
          >
            <FiMinus className="text-mainText h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="bg-border my-5 h-[2px] w-full"></div>
      <div className="flex w-full items-center justify-start gap-1">
        <p className="text-accentText text-sm">{t("quantity")}:</p>
        <p dir="ltr" className="font-english text-mainText text-sm">
          {`${addCommaSeparator(
            Number(
              new Decimal(Number(deleteCommas(contractSize))).times(
                Number(deleteCommas(entryPrice)),
              ),
            ),
          )} ${quoteAsset?.toUpperCase()}` || "0"}
        </p>
      </div>
    </div>
  );
}

export default VolumeInput;
