"use client";

import ImageSection from "./ImageSection";
import MarketsSection from "./MarketsSection";
import TrustSection from "./TrustSection";
import WelcomeSection from "./WelcomeSection";

const TopSection = () => {
  return (
    <div className="bg-landingSecondaryBackground relative mx-auto flex flex-col items-center justify-center overflow-hidden rounded-b-[6.25rem] px-5 py-14 pb-6 text-center lg:py-24 lg:pb-10 xl:pb-14">
      <ImageSection />

      <WelcomeSection />

      <MarketsSection />

      <TrustSection />
    </div>
  );
};

export default TopSection;
