import InputDesktop from "@/components/molecules/inputDesktop";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useRegisterContext } from "../provider";
import PasswordConditionSection from "./conditionCheck";

const PasswordSection = () => {
  const t = useTranslations();
  const { control, errors, watch, setValue } = useRegisterContext();

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="w-full space-y-5">
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <InputDesktop
              iconType="eye"
              {...field}
              label={t("passwordNew")}
              autoComplete={"off"}
              maxLength={100}
              type="password"
              labelContainerClassName="bg-surface "
              error={errors?.password?.message}
              isAmount={false}
            />
          )}
          rules={{
            required: { message: t("pleaseFillInput"), value: true },
          }}
        />

        <PasswordConditionSection password={watch("password")} />

        <Controller
          control={control}
          name="passwordRepeat"
          render={({ field }) => (
            <InputDesktop
              iconType="eye"
              {...field}
              label={t("passwordNewRepeat")}
              autoComplete={"off"}
              maxLength={100}
              type="password"
              labelContainerClassName="bg-surface "
              error={errors?.passwordRepeat?.message}
              isAmount={false}
            />
          )}
          rules={{
            required: { message: t("pleaseFillInput"), value: true },
            validate: {
              matchesPassword: (value) =>
                value === watch("password") || t("passwordsDoNotMatch"),
            },
          }}
        />
        {!watch("hasRefCode") && !watch("referralCode") ? (
          <div className="text-mainText flex items-center gap-1">
            <p className="text-xs">{t("partnerCode")}</p>
            <button
              className="text-positive text-xs underline"
              onClick={() => setValue("hasRefCode", true)}
              type="button"
            >
              {t("enterHere")}
            </button>
          </div>
        ) : (
          <div>
            <Controller
              control={control}
              name="referralCode"
              render={({ field }) => (
                <InputDesktop
                  isAmount={false}
                  label={t("partnerCode")}
                  labelContainerClassName="bg-surface "
                  {...field}
                />
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordSection;
