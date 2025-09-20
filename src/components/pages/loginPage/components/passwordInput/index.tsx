import CustomInput from "@/components/atoms/customInput";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useLoginContext } from "../../provider";

function PasswordInput() {
  const t = useTranslations();
  const { watch, control, errors } = useLoginContext();

  const password = watch("password");
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const [isPasswordPlaceHolderVisible, setIsPasswordPlaceHolderVisible] =
    useState<boolean>(false);

  const [passwordInputType, setPasswordInputType] = useState<
    "password" | "text"
  >("password");

  const eyeClickHandler = () => {
    setPasswordInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <Controller
      control={control}
      name={"password"}
      render={({ field }) => (
        <CustomInput
          maxLength={50}
          {...field}
          onFocus={() => setIsPasswordPlaceHolderVisible(true)}
          onBlur={() => setIsPasswordPlaceHolderVisible(false)}
          icon={
            passwordInputType === "password" ? (
              <IoMdEye
                onClick={() => {
                  setHidePassword((prev) => !prev);
                }}
                className="text-mainBrand h-5 w-5"
              />
            ) : (
              <IoMdEyeOff
                onClick={() => {
                  setHidePassword((prev) => !prev);
                }}
                className="text-mainBrand h-5 w-5"
              />
            )
          }
          onIconClick={eyeClickHandler}
          error={errors?.password?.message}
          label={t("password")}
          type={hidePassword ? "password" : "text"}
          inputClassName="border-none"
          placeholder={
            !isPasswordPlaceHolderVisible ? t("enterYourPassword") : undefined
          }
          value={password}
          wrapperClassName="h-12 my-2 border-b border-b border-accentText pb-8"
        />
      )}
      rules={{
        required: { message: t("pleaseFillInput"), value: true },
      }}
    />
  );
}

export default PasswordInput;
