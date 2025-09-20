import InputDesktop from "@/components/molecules/inputDesktop";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useRegisterContext } from "../provider";

const NameSection = () => {
  const t = useTranslations();

  const { control, errors } = useRegisterContext();

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex h-full w-full items-center justify-start">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <InputDesktop
              label={t("name2")}
              onChange={onChange}
              value={value}
              labelContainerClassName="bg-surface "
              error={errors?.name?.message}
              isAmount={false}
            />
          )}
          rules={{
            required: t("pleaseEnterName"),
          }}
        />
      </div>
      <div className="flex h-full w-full items-center justify-start">
        <Controller
          control={control}
          name="family_name"
          render={({ field: { onChange, value } }) => (
            <InputDesktop
              label={t("familyName")}
              onChange={onChange}
              labelContainerClassName="bg-surface "
              value={value}
              error={errors?.family_name?.message}
              isAmount={false}
            />
          )}
          rules={{
            required: t("pleaseEnterFamilyName"),
          }}
        />
      </div>
    </div>
  );
};

export default NameSection;
