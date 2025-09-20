import { useTranslations } from "next-intl";
import TradeInput from "../tradeInput";

function BackupMarginInput() {
  const t = useTranslations();
  return (
    <TradeInput
      hasArrows={false}
      fieldName={"backupMargin"}
      label={t("backupMargin")}
      placeholder={t("enterBackupMargin")}
    />
  );
}

export default BackupMarginInput;
