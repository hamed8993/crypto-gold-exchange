import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const Animation = dynamic(
  () => import("./animation").then((module) => module.default),
  { ssr: false },
);

function ReferralCard() {
  const t = useTranslations();
  const { locale } = useUrl();
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex h-fit min-h-fit w-[96%] flex-col items-center justify-start self-center overflow-hidden rounded-lg bg-surface dark:bg-surfaceDark">
      <div className="flex w-full items-center justify-between self-center px-3">
        <div className="flex flex-col items-start justify-between py-2">
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-[18px] text-mainText dark:text-mainTextDark">
              {t("referralDashboard1")}
            </p>
            <p className="text-[18px] text-mainText dark:text-mainTextDark">
              {`${t("to2")} `}
              <span className="text-[22px] text-positive">
                {`${t("referralDashboard2")} `}
              </span>
              {t("irtSymbol")}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="mx-auto h-28 w-28 ltr:scale-x-[-1]">
            <Animation />
          </div>
        </div>
      </div>

      <div className="flex h-px w-[94%] bg-accentText50 dark:bg-accentTextDark50" />

      <div className="mb-3 flex w-[94%] items-center justify-between py-3">
        <p className="text-xs text-accentText dark:text-accentTextDark">
          {t("referralDashboard3")}
        </p>
        {isLoggedIn ? (
          <div className="flex h-8! min-h-8! w-fit items-center justify-end">
            <Link
              className="text-xs text-mainText dark:text-mainTextDark"
              href={`/${locale}/${RoutesName.referral}`}
              prefetch
            >
              {t("addReferral")}
            </Link>
            <IoIosArrowBack className="h-4 w-4 text-accentText ltr:rotate-180 dark:text-accentTextDark" />
          </div>
        ) : (
          <div className="flex h-8! min-h-8! w-36 min-w-36 items-center justify-end gap-1">
            <Link
              className="text-xs text-mainText dark:text-mainTextDark"
              href={`/${locale}/authentication/login`}
              prefetch
            >
              {t("login")}
            </Link>
            <IoIosArrowBack className="h-4 w-4 text-mainText ltr:rotate-180 dark:text-mainTextDark" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ReferralCard;
