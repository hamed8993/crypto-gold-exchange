import InputDefault from "@/shared/atoms/inputDefault";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useLoginContext } from "../../provider";

function PasswordInput() {
  const t = useTranslations();
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  useState<boolean>(false);
  const [passwordInputType, setPasswordInputType] = useState<
    "password" | "text"
  >("password");

  const { watch, control, errors, setValue } = useLoginContext();
  const eyeClickHandler = () => {
    setPasswordInputType((prev) => (prev === "password" ? "text" : "password"));
  };
  return (
    <Controller
      control={control}
      name={"password"}
      render={({ field }) => (
        <InputDefault
          {...field}
          placeholder={t("enterYourPassword")}
          label={t("password")}
          error={errors?.password?.message}
          type={hidePassword ? "password" : "text"}
          wrapperClassName="mt-6 w-[380px]!"
          onIconClick={eyeClickHandler}
          icon={
            passwordInputType === "password" ? (
              <IoMdEye
                className="h-5 w-5 text-mainBrand"
                onClick={() => {
                  setHidePassword((prev) => !prev);
                }}
              />
            ) : (
              <IoMdEyeOff
                className="h-5 w-5 text-mainBrand"
                onClick={() => {
                  setHidePassword((prev) => !prev);
                }}
              />
            )
          }
          className="h-12! py-0! text-textPrimary placeholder:text-textPlaceholder hover:border-borderFocus"
          onChange={(e) => setValue("password", e.target.value)}
          value={watch("password")}
        />
      )}
      rules={{
        required: { message: t("pleaseFillInput"), value: true },
      }}
    />
  );
}

export default PasswordInput;
