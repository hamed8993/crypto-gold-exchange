"use client";
import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import { useAuth } from "@/core/providers/authProvider";
import clsx from "clsx";
import AboutGoldFinoSection from "./components/aboutGoldFinoSection";
import AboutUsSection from "./components/aboutUsSection";
import FaqSection from "./components/faqSection";
import Footer from "./components/footer";
import GainerLoserCardsSection from "./components/gainerLoserCardsSection";
import GoldfinoSection from "./components/goldfinoSection";
import IFrameMobileSection from "./components/iFrameMobileSEction";
import LiveMarketSection from "./components/liveMarketSection";
import RegisterNavigationSection from "./components/registerNavigationSection";
import TrustUsSection from "./components/trustUsSection";
import WhyGoldFinoSection from "./components/whyGoldFinoSection";

interface LandingPageProps {
  className?: string;
}

const LandingPage = ({ className }: LandingPageProps) => {
  const { isLoggedIn } = useAuth();

  return (
    <DesktopPageLayout
      hasHeaderBg
      className={clsx(className, "bg-newColor_bgNeutral")}
      hasFooter={false}
      hasHeader
    >
      <GoldfinoSection containerClassName="mt-[57px] mb-[50px] lg:mt-[45px] lg:mb-[57px]" />
      <IFrameMobileSection containerClassName="mb-[52px] lg:mb-[67px]" />
      <GainerLoserCardsSection containerClassName="mb-[123px] lg:mb-[109px]" />
      <AboutUsSection containerClassName="mb-[96px] lg:mb-[85px]" />
      <TrustUsSection containerClassName="mb-[64px] lg:mb-[64px]" />
      <LiveMarketSection containerClassName="mb-[36px] lg:mb-[120px]" />
      <WhyGoldFinoSection containerClassName="mb-[87px] lg:mb-[117px]" />
      <FaqSection containerClassName="mb-[64px] lg:mb-[127px]" />
      <AboutGoldFinoSection containerClassName="mb-[60px] lg:mb-[193px]" />
      {isLoggedIn && (
        <RegisterNavigationSection containerClassName="mb-[90px] lg:mb-[160px]" />
      )}

      <Footer containerClassName="mb-6" />

      {/* <TopSection />

      <ExploreSection />

      <StatsSectionsSmall />

      {/* DO NOT REMOVE */}
      {/* <StatsSection /> */}

      {/* <SafetySection /> */}

      {/* <ContactSection /> */}
      {/* <SafetySection />
 
      <ContactSection /> */}
      {/* <SignUpInput /> */}
    </DesktopPageLayout>
  );
};

export default LandingPage;
