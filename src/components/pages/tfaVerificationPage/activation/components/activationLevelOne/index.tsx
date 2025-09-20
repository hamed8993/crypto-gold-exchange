import { useTranslations } from "next-intl";
import Link from "next/link";
import { RiNumber1 } from "react-icons/ri";

function ActivationLevelOne() {
  const t = useTranslations();

  return (
    <div className="mt-3 flex flex-col items-start justify-start">
      <div className="flex h-fit w-full items-start justify-start">
        <RiNumber1 className="text-positive min-h-4 min-w-4" />
        <p className="text-mainText mx-2 text-sm/6">
          {t("tfaLevel1")}
          <span className="text-accentText text-xs">
            {` ${t("tfaLevel11")} `}
          </span>
        </p>
      </div>
      <Link
        href={
          "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
        }
        className="mx-6 mt-1 flex h-fit items-start justify-start"
      >
        <p className="text-mainBrandAlternative text-xs">
          {t("downloadAuthenticatorLink")}
        </p>
      </Link>
    </div>
  );
}

export default ActivationLevelOne;
