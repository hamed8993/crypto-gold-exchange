import { useTranslations } from "next-intl";

interface RiskTextProps {
  text: string;
}

function RiskText({ text }: RiskTextProps) {
  const t = useTranslations();

  return (
    <p className={"text-mainText mt-4 text-justify text-sm leading-7"}>
      {t(text)}
    </p>
  );
}

export default RiskText;
