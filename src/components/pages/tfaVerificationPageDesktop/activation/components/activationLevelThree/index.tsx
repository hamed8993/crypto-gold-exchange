import InputDesktop from "@/components/molecules/inputDesktop";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { RiNumber3 } from "react-icons/ri";
import { useActivateTFAContext } from "../../provider";

function ActivationLevelThree() {
  const t = useTranslations();

  const { control } = useActivateTFAContext();

  return (
    <div className="mt-10 flex h-fit w-full items-start justify-start">
      <div className="flex w-full flex-col items-start justify-start">
        <div className="flex h-fit w-full items-start justify-start">
          <RiNumber3 className="text-positive min-h-4 min-w-4" />

          <p className="text-mainText mx-2 text-sm">{t("tfaLevel3")}</p>
        </div>

        <div className="w-full max-w-[400px]">
          <Controller
            control={control}
            name="tfaCode"
            render={({ field }) => (
              <InputDesktop
                {...field}
                label={t("tfa6DigitCode")}
                labelContainerClassName="!bg-mainBackground "
                maxLength={6}
                inputMode="numeric"
              />
            )}
            rules={{ required: { message: t("pleaseFillInput"), value: true } }}
          />
        </div>
      </div>
    </div>
  );
}

export default ActivationLevelThree;
