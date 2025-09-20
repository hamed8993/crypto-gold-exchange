"use client";

import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataGet_referral_codes } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import ReferralItem from "../referralItem";

function MyReferrals() {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { data } = useGetUser_dataGet_referral_codes({ enabled: isLoggedIn });
  const list = data?.result?.refCodes;

  return (
    <div className="w-full px-2">
      <p className="text-mainText mx-3 mt-4 text-justify text-base">
        {t("referralLinksTitle")}
      </p>
      {list?.map((item, index) => {
        return <ReferralItem item={item} key={index} />;
      })}
    </div>
  );
}

export default MyReferrals;
