import TermsText from "../termsText";
import CustomCard from "@/components/atoms/customCard";
import CustomImage from "@/components/atoms/customImage";

function Card4() {
  return (
    <CustomCard>
      <CustomImage
        alt="commitment"
        darkSrc="/assets/images/fund-dark.webp"
        lightSrc="/assets/images/fund-light.webp"
        height={80}
        themeRequired
        width={80}
      />
      <TermsText text={"terms4_1"} />
      <ul>
        <li>
          <TermsText text={"terms4_2"} />
        </li>
        <li>
          <TermsText text={"terms4_3"} />
        </li>
        <li>
          <TermsText text={"terms4_4"} />
        </li>
        <li>
          <TermsText text={"terms4_5"} />
        </li>
        <li>
          <TermsText text={"terms4_6"} />
        </li>
        <li>
          <TermsText text={"terms4_7"} />
        </li>
        <li>
          <TermsText text={"terms4_8"} />
        </li>
        <li>
          <TermsText text={"terms4_9"} />
        </li>
        <li>
          <TermsText text={"terms4_10"} />
        </li>
        <li>
          <TermsText text={"terms4_11"} />
        </li>
        <li>
          <TermsText text={"terms4_12"} />
        </li>
        <li>
          <TermsText text={"terms4_13"} />
        </li>
        <li>
          <TermsText text={"terms4_14"} />
        </li>
        <li>
          <TermsText text={"terms4_15"} />
        </li>
        <li>
          <TermsText text={"terms4_16"} />
        </li>
        <li>
          <TermsText text={"terms4_17"} />
        </li>
      </ul>
    </CustomCard>
  );
}

export default Card4;
