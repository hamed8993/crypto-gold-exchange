import DesktopForgetTfaPage from "@/components/pages/desktopForgetTfaPage";
import ForgetTfaPage from "@/components/pages/forgetTfaPage";

function ForgetTfa() {
  return (
    <>
      <DesktopForgetTfaPage className="hidden md:block" />
      <ForgetTfaPage className="md:hidden" />
    </>
  );
}

export default ForgetTfa;
