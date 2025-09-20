import TermsText from "../termsText";
import CustomCard from "@/components/atoms/customCard";
import CustomImage from "@/components/atoms/customImage";

function Card3() {
  return (
    <CustomCard>
      <CustomImage
        alt="commitment"
        darkSrc="/assets/images/commitment2-dark.webp"
        height={80}
        lightSrc="/assets/images/commitment2-light.webp"
        themeRequired
        width={80}
      />
      <ul>
        <TermsText text={"terms3_1"} />
        <li>
          <TermsText text={"terms3_2"} />
        </li>
        <li>
          <TermsText text={"terms3_3"} />
        </li>
        <li>
          <TermsText text={"terms3_4"} />
        </li>
        <li>
          <TermsText text={"terms3_5"} />
        </li>
        <li>
          <TermsText text={"terms3_6"} />
        </li>
        <li>
          <TermsText text={"terms3_7"} />
        </li>
      </ul>
    </CustomCard>
  );
}

export default Card3;
