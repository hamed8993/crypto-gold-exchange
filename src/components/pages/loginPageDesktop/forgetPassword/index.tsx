import TopRightSection from "../components/topRightSection";
import ContinueButton from "./components/continueButton";
import EmailInput from "./components/emailInput";
import TitleSection from "./components/titleSection";

function ForgetPassword() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-between">
      <TopRightSection />
      <div className="flex h-full w-[380px]! min-w-[380px]! flex-col items-center justify-start pt-12">
        <TitleSection />
        <EmailInput />
        <ContinueButton />
      </div>
    </div>
  );
}

export default ForgetPassword;
