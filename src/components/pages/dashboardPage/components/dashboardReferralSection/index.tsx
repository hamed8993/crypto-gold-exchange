import ButtonLink from "@/components/atoms/buttonLink";
import { RoutesName } from "@/core/constants/routes";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataGet_referral_codes } from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { FaUserFriends } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";

function DashboardReferralSection() {
  const t = useTranslations();

  const { isLoggedIn } = useAuth();

  const { data: dataReferralCodes } = useGetUser_dataGet_referral_codes({
    enabled: isLoggedIn,
  });

  const referralCodes = dataReferralCodes?.result?.refCodes;
  const totalClaimed = dataReferralCodes?.result?.totalClaimed;

  const totalSubsetCount = referralCodes?.reduce(
    (sum, item) => sum + Number(item),
    0,
  );

  return (
    <div className="mb-5 mt-2 flex w-full flex-col items-start justify-start rounded-2xl border-borderDark/50 bg-surface p-4 dark:bg-surfaceDark">
      <div className="flex w-full flex-col items-center justify-start px-3">
        <p className="mt-3 text-justify text-xs text-mainText dark:text-mainTextDark">
          {t("dashboardReferralCardTitle")}
        </p>
      </div>

      <div
        className="mt-4 flex w-full items-center justify-between divide-x divide-accentTextDark rounded-lg bg-surface py-2 dark:bg-surfaceDark"
        dir="ltr"
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <FaUserFriends className="h-8 w-8 text-accentTextDark" />
          <p className="text-sm text-accentText dark:text-accentTextDark">
            {t("referralCount")}
          </p>
          <p className="font-english text-sm text-accentText dark:text-accentTextDark">
            {addCommaSeparator(totalSubsetCount || "0")}
          </p>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <GiWallet className="h-8 w-8 text-accentTextDark" />
          <p className="text-sm text-accentText dark:text-accentTextDark">
            {t("earnedMoney")}
          </p>
          <p className="font-english text-sm text-accentText dark:text-accentTextDark">
            {addCommaSeparator(totalClaimed || "0")}
          </p>
        </div>
      </div>

      <ButtonLink
        className="mt-4 w-full items-center justify-center self-center text-sm"
        href={RoutesName.referral}
      >
        {t("invite")}
      </ButtonLink>
    </div>
  );
}

export default DashboardReferralSection;
