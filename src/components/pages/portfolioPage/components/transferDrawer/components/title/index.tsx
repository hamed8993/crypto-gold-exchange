import { useTranslations } from "next-intl";

interface TitleProps {
  asset?: string;
}

function Title({ asset }: TitleProps) {
  const t = useTranslations();
  return (
    <p className="text-accentText">
      {t("manageWalletTitle", {
        wallet: asset === "irt" ? t("irtiSymbol") : t("usdSymbol"),
      })}
    </p>
  );
}

export default Title;
