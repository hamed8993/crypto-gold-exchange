import TopRightSection from "../components/topRightSection";
import BackToLoginButton from "./components/backToLoginButton";
import TitleSection from "./components/titleSection";

function ForgetTfaResult() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-between">
      <TopRightSection />
      <div className="flex h-full w-[380px]! min-w-[380px]! flex-col items-center justify-start pt-12">
        <TitleSection />
        <BackToLoginButton />
      </div>
    </div>
  );
}

export default ForgetTfaResult;
