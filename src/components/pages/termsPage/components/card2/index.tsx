import TermsText from "../termsText";
import CustomCard from "@/components/atoms/customCard";
import CustomImage from "@/components/atoms/customImage";

function Card2() {
  return (
    <CustomCard>
      <CustomImage
        alt="commitment"
        darkSrc="/assets/images/commitment-dark.webp"
        height={80}
        lightSrc="/assets/images/commitment-light.webp"
        themeRequired
        width={80}
      />
      <ul>
        <TermsText text={"terms2_1"} />
        <li>
          <TermsText text={"terms2_2"} />
        </li>
        <li>
          <TermsText text={"terms2_3"} />
        </li>
        <li>
          <TermsText text={"terms2_4"} />
        </li>
        <li>
          <TermsText text={"terms2_5"} />
        </li>
        <li>
          <TermsText text={"terms2_6"} />
        </li>
        <li>
          <TermsText text={"terms2_7"} />
        </li>
        <li>
          <TermsText text={"terms2_8"} />
        </li>
        <li>
          <TermsText text={"terms2_9"} />
        </li>
        <li>
          <TermsText text={"terms2_10"} />
        </li>
        <li>
          <TermsText text={"terms2_11"} />
        </li>
        <li>
          <TermsText text={"terms2_12"} />
        </li>
        <li>
          <TermsText text={"terms2_13"} />
        </li>
      </ul>
    </CustomCard>
  );
}

export default Card2;
