import TermsText from "../termsText";
import CustomCard from "@/components/atoms/customCard";
import CustomImage from "@/components/atoms/customImage";

function Card6() {
  return (
    <CustomCard>
      <CustomImage
        alt="commitment"
        darkSrc="/assets/images/identity-dark.webp"
        height={80}
        lightSrc="/assets/images/identity-light.webp"
        themeRequired
        width={80}
      />
      <TermsText text={"terms6_1"} />
      <TermsText text={"terms6_2"} />
      <TermsText text={"terms6_3"} />
      <TermsText text={"terms6_4"} />
      <TermsText text={"terms6_5"} />
      <TermsText text={"terms6_6"} />
      <TermsText text={"terms6_7"} />
      <TermsText text={"terms6_8"} />
      <TermsText text={"terms6_9"} />
    </CustomCard>
  );
}

export default Card6;
