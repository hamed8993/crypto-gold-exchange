import CustomButton from "@/components/atoms/customButton";
import CustomLineInput from "@/components/atoms/customLineInput";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import TypingH2 from "@/components/atoms/typingH2";
import { useTranslations } from "next-intl";
import { FormEventHandler, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useRegisterContext } from "../../provider";

interface RegisterStepTwoProps {
  next?: () => void;
}

function RegisterStepTwo({ next }: RegisterStepTwoProps) {
  const t = useTranslations();

  const { control, handleSubmit, watch, errors } = useRegisterContext();

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isStickyReady, setIsStickyReady] = useState<boolean>(false);

  const isValid = () => {
    if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(watch("email"))
    ) {
      return true;
    }
    return false;
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (isValid()) {
      setTimeout(() => {
        handleSubmit(() => next?.())();
      }, 100);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 500);
    setIsStickyReady(true);
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <TypingH2
        className="text-mainText mt-10 mb-1 min-h-5 text-start font-semibold"
        text={t("pleaseProvideEmailCellphone")}
      />

      <p className="text-accentText text-start text-sm">{t("helpsUs")}</p>
      <form
        className="flex h-full w-full flex-col items-center justify-between"
        onSubmit={onSubmit}
      >
        <div className="flex w-full flex-col gap-8">
          <div className="flex h-full w-full items-center justify-start">
            <Controller
              control={control}
              name="cellphone"
              render={({ field: { onChange, value } }) => (
                <CustomLineInput
                  disabled={!isReady}
                  label={t("cellphone")}
                  onChange={onChange}
                  value={value}
                  inputMode="decimal"
                  error={errors?.cellphone?.message}
                  maxLength={11}
                />
              )}
              rules={{
                required: t("pleaseEnterCellphone"),
              }}
            />
          </div>
          <div className="flex h-full w-full items-center justify-start">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <CustomLineInput
                  label={t("email")}
                  onChange={onChange}
                  value={value}
                  disabled={!isReady}
                  error={errors?.email?.message}
                />
              )}
              rules={{
                required: t("pleaseEnterEmail"),
              }}
            />
          </div>
        </div>
        {isStickyReady && (
          <StickyComponent className="bg-mainBackground w-full px-2">
            <div className="flex w-full justify-between gap-2 py-5">
              <CustomButton
                className="z-20 h-12 rounded-md"
                isDisabled={!isValid()}
                type="submit"
              >
                {t("continue")}
              </CustomButton>
            </div>
          </StickyComponent>
        )}
      </form>
    </div>
  );
}

export default RegisterStepTwo;
