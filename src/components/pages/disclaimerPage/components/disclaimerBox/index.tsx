import CustomCard from "@/components/atoms/customCard";
import CustomImage from "@/components/atoms/customImage";
import { useTranslations } from "next-intl";

interface DisclaimerBoxProps {
  alt: string;
  text: string;
  darkSrc: string;
  lightSrc: string;
}

function DisclaimerBox({ alt, darkSrc, lightSrc, text }: DisclaimerBoxProps) {
  const t = useTranslations();

  return (
    <CustomCard>
      <CustomImage
        alt={alt}
        darkSrc={darkSrc}
        height={80}
        lightSrc={lightSrc}
        themeRequired={true}
        width={80}
      />
      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        {t(text)}
      </p>
    </CustomCard>
  );
}

export default DisclaimerBox;
