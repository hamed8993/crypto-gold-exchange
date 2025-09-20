import CustomCard from "@/components/atoms/customCard";
import PwaPageLayout from "@/components/organisms/layout";
import { useTranslations } from "next-intl";
import DisclaimerBox from "./components/disclaimerBox";

function DisclaimerPage() {
  const t = useTranslations();

  return (
    <PwaPageLayout title={t("disclaimer")} hasBackChevron>
      <CustomCard>
        <p className="text-mainText mt-4 text-justify text-sm leading-7">
          {t("disclaimer1")}
        </p>
      </CustomCard>
      <DisclaimerBox
        alt="megaphone"
        darkSrc="/assets/images/megaphone-dark.webp"
        lightSrc="/assets/images/megaphone-light.webp"
        text="disclaimer2"
      />
      <DisclaimerBox
        alt="research"
        darkSrc="/assets/images/research-dark.webp"
        lightSrc="/assets/images/research-light.webp"
        text="disclaimer3"
      />
      <DisclaimerBox
        alt="question"
        darkSrc="/assets/images/question-dark.webp"
        lightSrc="/assets/images/question-light.webp"
        text="disclaimer4"
      />
      <DisclaimerBox
        alt="caution"
        darkSrc="/assets/images/caution-dark.webp"
        lightSrc="/assets/images/caution-light.webp"
        text="disclaimer5"
      />
      <DisclaimerBox
        alt="operator"
        darkSrc="/assets/images/operator-dark.webp"
        lightSrc="/assets/images/operator-light.webp"
        text="disclaimer6"
      />
    </PwaPageLayout>
  );
}

export default DisclaimerPage;
