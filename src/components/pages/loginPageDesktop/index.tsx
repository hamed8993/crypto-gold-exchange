"use client";
import AuthenticationLayout from "@/shared/molecules/authLayout";
import clsx from "clsx";
import LoginForm from "./components/loginForm";
import ForgetPassword from "./forgetPassword";
import ForgetPasswordCodeInput from "./forgetPasswordCodeInput";
import ForgetPasswordFinalStep from "./forgetPasswordFinalStep";
import ForgetTfa from "./forgetTfa";
import ForgetTfaCodeInput from "./forgetTfaCodeInput";
import ForgetTfaResult from "./forgetTfaResult";
import { LoginContextProvider, useLoginContext } from "./provider";
import TfaCode from "./tfaCode";

interface LoginPageDesktopProps {
  className?: string;
}

const LoginPageDesktopComponent = ({ className }: LoginPageDesktopProps) => {
  const { watch } = useLoginContext();
  const step = watch("loginStep");

  const renderSteps = () => {
    switch (step) {
      case "login":
        return <LoginForm />;
      case "tfaInput":
        return <TfaCode />;
      case "forgetTfa":
        return <ForgetTfa />;
      case "forgetTfaCodeInput":
        return <ForgetTfaCodeInput />;
      case "forgetTfaResult":
        return <ForgetTfaResult />;
      case "forgetPassword":
        return <ForgetPassword />;
      case "forgetPasswordCodeInput":
        return <ForgetPasswordCodeInput />;
      case "forgetPasswordFinalStep":
        return <ForgetPasswordFinalStep />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <AuthenticationLayout className={clsx(className, "pt-0!")}>
      <div className="flex h-screen w-full items-center justify-between">
        {renderSteps()}
      </div>
    </AuthenticationLayout>
  );
};

const LoginPageDesktop = ({ ...props }: LoginPageDesktopProps) => {
  return (
    <LoginContextProvider>
      <LoginPageDesktopComponent {...props} />
    </LoginContextProvider>
  );
};

export default LoginPageDesktop;
