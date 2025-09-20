import ForgetPasswordPage from "@/components/pages/forgetPasswordPage";
import ForgetPasswordPageDesktop from "@/components/pages/forgetPasswordPageDesktop";

function ForgetPassword() {
  return (
    <>
      <ForgetPasswordPage className="md:hidden" />
      <ForgetPasswordPageDesktop className="hidden md:block" />
    </>
  );
}

export default ForgetPassword;
