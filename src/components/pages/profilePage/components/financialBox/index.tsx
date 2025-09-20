"use client";

import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataAccount_details } from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import LimitationBox from "../limitationBox";

function FinancialBox() {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();

  const { data: dataAccountDetailsData } = useGetUser_dataAccount_details({
    enabled: isLoggedIn,
  });
  const userAccountDetails = dataAccountDetailsData?.result;

  return (
    <>
      <div className="mt-3 flex h-28 w-full items-center justify-between gap-3">
        <LimitationBox
          title={t("lastMonthWithdrawVolume")}
          value={addCommaSeparator(
            userAccountDetails?.last30dWithdrawVolume || "",
          )}
        />
        <LimitationBox
          title={t("last24hWithdrawVolume")}
          value={addCommaSeparator(
            userAccountDetails?.last24hWithdrawVolume || "",
          )}
        />
      </div>
      <div className="mt-3 flex h-28 w-full items-center justify-between gap-3">
        <LimitationBox
          title={t("dailyWithdrawLimit")}
          value={addCommaSeparator(
            userAccountDetails?.dailyWithdrawLimit || "",
          )}
        />
        <LimitationBox
          title={t("monthlyWithdrawLimit")}
          value={addCommaSeparator(
            userAccountDetails?.monthlyWithdrawLimit || "",
          )}
        />
      </div>
    </>
  );
}

export default FinancialBox;
