"use client";

import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import CreateReferralBox from "./components/createReferralBox";
import MyReferrals from "./components/myRefferrals";
import ReferralBannerBox from "./components/referralBannerBox";

interface DesktopReferralPageProps {
  className?: string;
}

function DesktopReferralPage({ className }: DesktopReferralPageProps) {
  return (
    <DesktopPageLayout className={className}>
      <div className="flex h-full w-full flex-col items-center justify-start px-[10%] pb-10">
        <div className="flex w-full items-center justify-between gap-2">
          <ReferralBannerBox />
          <CreateReferralBox />
        </div>
        <MyReferrals />
      </div>
    </DesktopPageLayout>
  );
}

export default DesktopReferralPage;
