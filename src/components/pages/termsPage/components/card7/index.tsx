import TermsText from "../termsText";
import CustomCard from "@/components/atoms/customCard";
import CustomImage from "@/components/atoms/customImage";
import HorizontalGradientLine from "@/components/atoms/horizontalGradientLine";

function Card7() {
  return (
    <CustomCard>
      <CustomImage
        alt="commitment"
        darkSrc="/assets/images/menu-dark.webp"
        height={80}
        lightSrc="/assets/images/menu-light.webp"
        themeRequired
        width={80}
      />
      <ul>
        <li>
          <TermsText text={"terms7_1"} />
        </li>
        <li>
          <TermsText text={"terms7_2"} />
        </li>
        <li>
          <TermsText text={"terms7_3"} />
        </li>
        <li>
          <TermsText text={"terms7_4"} />
        </li>
        <li>
          <TermsText text={"terms7_5"} />
        </li>
      </ul>
      <HorizontalGradientLine />
      <ul>
        <li>
          <TermsText text={"terms7_6"} />
        </li>
        <li>
          <TermsText text={"terms7_7"} />
        </li>
        <li>
          <TermsText text={"terms7_8"} />
        </li>
        <li>
          <TermsText text={"terms7_9"} />
        </li>
      </ul>
      <HorizontalGradientLine />
      <TermsText text={"terms7_10"} />
      <HorizontalGradientLine />
      <ul>
        <li>
          <TermsText text={"terms7_11"} />
        </li>
        <li>
          <TermsText text={"terms7_12"} />
        </li>
        <li>
          <TermsText text={"terms7_13"} />
        </li>
        <li>
          <TermsText text={"terms7_14"} />
        </li>
        <li>
          <TermsText text={"terms7_15"} />
        </li>
        <li>
          <TermsText text={"terms7_16"} />
        </li>
        <li>
          <TermsText text={"terms7_17"} />
        </li>
      </ul>
      <HorizontalGradientLine />
      <ul>
        <li>
          <TermsText text={"terms7_18"} />
        </li>
        <li>
          <TermsText text={"terms7_19"} />
        </li>
      </ul>
    </CustomCard>
  );
}

export default Card7;
