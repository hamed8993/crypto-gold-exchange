import CustomLineInput from "@/components/atoms/customLineInput";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { useDeactivateTFAContext } from "../../provider";

function DeactivationLevelOne() {
  const t = useTranslations();

  const { watch, control } = useDeactivateTFAContext();
  const tfa = watch("tfaCode");

  return (
    <Fragment>
      <div className="mt-6 flex h-fit w-full items-start justify-start">
        <div className="mx-2.5 -mt-0.5 flex h-fit min-w-1 items-center justify-center rounded-full bg-transparent"></div>
        <div className="flex flex-col items-start justify-start">
          <p className="text-mainText mx-2 mt-2 text-sm">
            {t("fourthStepDescription")}
          </p>
          <div className="mt-7 flex w-full items-center justify-center gap-2 self-center px-3">
            <div className="flex w-full flex-col items-start justify-start">
              <Controller
                control={control}
                name="tfaCode"
                render={({ field }) => (
                  <CustomLineInput
                    {...field}
                    label={t("tfa6DigitCode")}
                    maxLength={6}
                    inputMode="numeric"
                    labelClassName={
                      tfa
                        ? "!text-mainText  mx-6! text-xs!"
                        : "!text-accentText mx-6! text-xs!"
                    }
                    inputClassName={
                      tfa
                        ? "!text-mainText w-[85%]! mx-6! text-[16px]! !font-english text-center!"
                        : "!text-accentText  w-[85%]! mx-6! text-xs!"
                    }
                    wrapperClassName="mb-4"
                  />
                )}
                rules={{
                  required: { message: t("pleaseFillInput"), value: true },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DeactivationLevelOne;
