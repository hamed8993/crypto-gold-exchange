import TermsText from "../termsText";
import CustomCard from "@/components/atoms/customCard";
import CustomImage from "@/components/atoms/customImage";

function Card5() {
  return (
    <CustomCard>
      <CustomImage
        alt="commitment"
        darkSrc="/assets/images/security-dark.webp"
        height={80}
        lightSrc="/assets/images/security-light.webp"
        themeRequired
        width={80}
      />
      <TermsText text={"terms5_1"} />
      <TermsText text={"terms5_2"} />
    </CustomCard>
  );
}

export default Card5;
