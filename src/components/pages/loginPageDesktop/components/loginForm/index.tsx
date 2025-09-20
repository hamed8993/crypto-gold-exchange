import { useTranslations } from "next-intl";
import { useLoginContext } from "../../provider";
import EmailInput from "../emailInput";
import FormTopSection from "../formTopSection";
import LoginButton from "../loginButton";
import PasswordInput from "../passwordInput";
import TopRightSection from "../topRightSection";

function LoginForm() {
  const t = useTranslations();
  const { setValue } = useLoginContext();

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <TopRightSection />
      <div className="flex h-full w-[380px]! min-w-[380px]! flex-col items-center justify-start pt-12">
        <FormTopSection />
        <EmailInput />

        <PasswordInput />

        <p
          onClick={() => {
            setValue("loginStep", "forgetPassword");
          }}
          className="mt-4 cursor-pointer self-center text-[12px] text-mainBrand"
        >
          {t("forgetPassword")}
        </p>

        <LoginButton />
      </div>
    </div>
  );
}

export default LoginForm;
