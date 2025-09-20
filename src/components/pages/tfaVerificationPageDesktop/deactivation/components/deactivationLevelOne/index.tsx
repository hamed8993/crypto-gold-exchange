import InputDesktop from "@/components/molecules/inputDesktop";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { useDeactivateTFAContext } from "../../provider";

function DeactivationLevelOne() {
  const t = useTranslations();

  const { control } = useDeactivateTFAContext();

  return (
    <Fragment>
      <div className="mt-6 flex h-fit w-full items-start justify-start">
        <div className="flex flex-col items-start justify-start">
          <p className="text-mainText mx-2 mt-2 max-w-[400px] text-sm">
            {t("fourthStepDescription")}
          </p>
          <div className="flex w-full max-w-[400px] items-center justify-center gap-2 self-center">
            <div className="flex w-full flex-col items-start justify-start">
              <Controller
                control={control}
                name="tfaCode"
                render={({ field }) => (
                  <InputDesktop
                    {...field}
                    label={t("tfa6DigitCode")}
                    maxLength={6}
                    inputMode="numeric"
                    labelContainerClassName="!bg-mainBackground "
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
