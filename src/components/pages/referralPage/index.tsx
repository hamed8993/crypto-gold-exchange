import PwaPageLayout from "@/components/organisms/layout";
import { useTranslations } from "next-intl";
import CreateLinkButton from "./components/createLinkButton";
import IncomeBox from "./components/incomeBox";
import MyReferrals from "./components/myReferrals";

interface ReferralPageProps {
  className?: string;
}

function ReferralPage({ className }: ReferralPageProps) {
  const t = useTranslations();

  return (
    <PwaPageLayout
      wrapperClassName={className}
      hasFooter={false}
      hasBackChevron
      title={t("referral")}
    >
      <div className="flex h-[calc(100vh-140px)] w-full flex-col items-start justify-start overflow-auto">
        <IncomeBox />
        <MyReferrals />
      </div>
      <CreateLinkButton />
    </PwaPageLayout>
  );
}

export default ReferralPage;
