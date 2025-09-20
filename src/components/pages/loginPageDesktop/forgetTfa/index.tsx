import TopRightSection from "../components/topRightSection";
import TitleSection from "./components/TitleSection";
import EmailInput from "./components/emailInput";
import SubmitButton from "./components/submitButton";

function ForgetTfa() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-between">
      <TopRightSection />
      <div className="flex h-full w-[380px]! min-w-[380px]! flex-col items-center justify-start pt-12">
        <TitleSection />
        <EmailInput />
        <SubmitButton />
      </div>
    </div>
  );
}

export default ForgetTfa;
