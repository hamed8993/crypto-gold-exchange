import { useTranslations } from "next-intl";
import { PiWarningCircle } from "react-icons/pi";

function PasswordConditions() {
  const t = useTranslations();

  return (
    <div className="mt-4 flex w-full flex-col gap-3 text-sm text-textPlaceholder">
      <div className="flex items-center gap-2">
        <PiWarningCircle />
        <p>{t("passwordMin8Characters")}</p>
      </div>
      <div className="flex items-center gap-2">
        <PiWarningCircle />
        <p>{t("passwordMinUppercase")}</p>
      </div>
      <div className="flex items-center gap-2">
        <PiWarningCircle />
        <p>{t("passwordMinNumber")}</p>
      </div>
    </div>
  );
}

export default PasswordConditions;
