import TermsText from "../termsText";
import CustomCard from "@/components/atoms/customCard";
import HorizontalGradientLine from "@/components/atoms/horizontalGradientLine";

function Card1() {
  return (
    <CustomCard>
      <TermsText text={"terms1_1"} />
      <TermsText text={"terms1_2"} />
      <TermsText text={"terms1_3"} />
      <HorizontalGradientLine />
      <ul>
        <li>
          <TermsText text={"terms1_4"} />
        </li>
        <li>
          <TermsText text={"terms1_5"} />
        </li>
        <li>
          <TermsText text={"terms1_6"} />
        </li>
        <li>
          <TermsText text={"terms1_7"} />
        </li>
      </ul>
    </CustomCard>
  );
}

export default Card1;
