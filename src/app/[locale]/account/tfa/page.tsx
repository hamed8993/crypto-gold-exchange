import TfaVerificationPage from "@/components/pages/tfaVerificationPage";
import TfaVerificationPageDesktop from "@/components/pages/tfaVerificationPageDesktop";

function Tfa() {
  return (
    <>
      <TfaVerificationPage className="md:hidden" />
      <TfaVerificationPageDesktop className="hidden md:block" />
    </>
  );
}

export default Tfa;
