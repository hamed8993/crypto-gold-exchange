import { useTranslations } from "next-intl";
import RiskText from "./components/riskText";
import CustomCard from "@/components/atoms/customCard";
import PwaPageLayout from "@/components/organisms/layout";
import HorizontalGradientLine from "@/components/atoms/horizontalGradientLine";

function RiskDisclosurePage() {
  const t = useTranslations();

  return (
    <PwaPageLayout title={t("riskDisclosure")} hasBackChevron>
      <CustomCard>
        <RiskText text="risk1" />
        <HorizontalGradientLine />
        <ul>
          <li>
            <RiskText text="risk2" />
          </li>
          <li>
            <RiskText text="risk3" />
          </li>
          <li>
            <RiskText text="risk4" />
          </li>
          <li>
            <RiskText text="risk5" />
          </li>
          <li>
            <RiskText text="risk6" />
          </li>
          <li>
            <RiskText text="risk7" />
          </li>
        </ul>
      </CustomCard>
    </PwaPageLayout>
  );
}

export default RiskDisclosurePage;
