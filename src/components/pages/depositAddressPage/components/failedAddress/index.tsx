import { useTranslations } from "next-intl";
import Image from "next/image";

function FailedAddress() {
  const t = useTranslations();
  return (
    <div className="mt-3 flex h-fit w-full flex-col items-center justify-center gap-4 rounded-lg bg-surface py-10 dark:bg-surfaceDark">
      <Image
        alt="gold"
        width={150}
        height={150}
        src={"/assets/images/failed.webp"}
      />
      <p className="text-sm text-mainText dark:text-mainTextDark">
        {t("generatedAddressIsNotValidAnyMore")}
      </p>
    </div>
  );
}

export default FailedAddress;
