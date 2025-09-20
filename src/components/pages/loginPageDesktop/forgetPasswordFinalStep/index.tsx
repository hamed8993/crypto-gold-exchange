import TopRightSection from "../components/topRightSection";
import ConfirmButton from "./components/confirmButton";
import PasswordConditions from "./components/passwordConditions";
import NewPasswordInput from "./components/passwordInput";
import NewPasswordRepeatInput from "./components/repeatPasswordInput";
import TermsBox from "./components/termsBox";
import TitleSection from "./components/titleSection";

function ForgetPasswordFinalStep() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-between">
      <TopRightSection />
      <div className="flex h-full w-[380px]! min-w-[380px]! flex-col items-center justify-start pt-12">
        <TitleSection />
        <NewPasswordInput />
        <PasswordConditions />
        <NewPasswordRepeatInput />
        <TermsBox />
        <ConfirmButton />
      </div>
    </div>
  );
}

export default ForgetPasswordFinalStep;
