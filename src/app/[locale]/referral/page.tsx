import DesktopReferralPage from "@/components/pages/desktopReferralPage";
import ReferralPage from "@/components/pages/referralPage";

const Referral = () => {
  return (
    <>
      <DesktopReferralPage className="hidden md:block" />
      <ReferralPage className="md:hidden" />
    </>
  );
};

export default Referral;
