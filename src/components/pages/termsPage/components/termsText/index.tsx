import clsx from "clsx";
import { useTranslations } from "next-intl";

interface TermsTextProps {
  text: string;
  className?: string;
}

function TermsText({ text, className }: TermsTextProps) {
  const t = useTranslations();

  return (
    <p
      className={clsx(
        "text-mainText mt-4 text-justify text-sm leading-7",
        className,
      )}
    >
      {t(text)}
    </p>
  );
}

export default TermsText;
