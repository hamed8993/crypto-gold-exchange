import CustomDateTime from "@/components/atoms/customDateTime";
import { RoutesName } from "@/core/constants/routes";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { useGetUser_dataAccount_details } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { RiEditBoxLine } from "react-icons/ri";
import ProfileItemBox from "../profileItemBox";

function ProfileSecondDetailRow() {
  const t = useTranslations();
  const { locale } = useUrl();
  const { data } = useGetUser_dataAccount_details();
  const { getQuoteName } = useMarketsNamesData();
  return (
    <div className="mt-2 flex w-full items-center justify-between gap-3">
      <ProfileItemBox
        title={t("last24HourWithdrawal")}
        hasComponent
        extraTitle={data?.result?.last24hWithdrawVolume}
        extraValue={getQuoteName("irt")}
      />
      <ProfileItemBox
        title={t("last30DaysWithdrawal")}
        hasComponent
        extraTitle={data?.result?.last30dWithdrawVolume}
        extraValue={getQuoteName("irt")}
      />

      <ProfileItemBox
        title={t("tfa")}
        hasComponent
        extraComponent={
          <Link
            href={`/${locale}/${RoutesName.tfa}`}
            className="flex items-center justify-start gap-2"
          >
            <RiEditBoxLine className="text-negative text-lg" />
            <p className="text-accentText">
              {data?.result?.twoFactorAuthenticationStatus === "on"
                ? t("active")
                : t("inactive")}
            </p>
          </Link>
        }
      />

      <ProfileItemBox
        title={t("accountCreatedOn")}
        hasComponent
        extraComponent={
          <CustomDateTime
            isDisplayClock={false}
            timeStamp={data?.result?.registerTime || ""}
          />
        }
      />
    </div>
  );
}

export default ProfileSecondDetailRow;
