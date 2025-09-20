import DesktopTermsPage from "@/components/pages/desktopTermsPage";
import TermsPage from "@/components/pages/termsPage";

function Terms() {
  return (
    <>
      <DesktopTermsPage className="hidden md:block" />
      <TermsPage className="md:hidden" />
    </>
  );
}

export default Terms;
