"use client";

import CustomDateTime from "@/components/atoms/customDateTime";
import { RoutesName } from "@/core/constants/routes";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import { useCopyNotification } from "@/core/providers/copyNotificationProvider";
import {
  useGetUser_dataAccount_details,
  useGetUser_dataBalance,
} from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";
import DetailRow from "../detailRow";
import LastDayWithdrawalHelpDrawer from "../lastDayWithdrawalHelpDrawer";
import LastMonthWithdrawalHelpDrawer from "../lastmonthWithdrawalHelpDrawer";
import TfaHelpDrawer from "../tfaHelpDrawer";

type TotalsByCoin = {
  [coin: string]: number;
};

function UserDetailBox() {
  const t = useTranslations();
  const { locale } = useUrl();
  const { isLoggedIn } = useAuth();
  const { showNotification } = useCopyNotification();

  const handleCopy = (copyValue: string) => {
    navigator.clipboard.writeText(copyValue);
    showNotification(t("copiedToClipboard"));
  };

  const { data } = useGetUser_dataAccount_details({ enabled: isLoggedIn });
  const { getQuoteName } = useMarketsNamesData();

  const [isLastDayWithdrawalDrawerOpen, setIsLastDayWithdrawalDrawerOpen] =
    useState(false);
  const [isLast30DayWithdrawalDrawerOpen, setIsLast30DayWithdrawalDrawerOpen] =
    useState(false);
  const [isTfaDrawerOpen, setIsTfaDrawerOpen] = useState(false);

  const { data: balanceData } = useGetUser_dataBalance({ enabled: isLoggedIn });
  const marginWallet = balanceData?.result?.margin || [];
  const mainWallet = balanceData?.result?.main || [];

  const combined = [...mainWallet, ...marginWallet];

  const totalsByCoin = combined.reduce<TotalsByCoin>((acc, item) => {
    const coin = item?.coin?.toLowerCase();
    const total = parseFloat(item?.total);
    acc[coin] = (acc[coin] || 0) + total;
    return acc;
  }, {});

  return (
    <div className="">
      <div className="divide-accentText50 bg-surface divide-y rounded-md px-3">
        <DetailRow
          hasExtraIcon={false}
          title={t("accountStatus")}
          value={
            <div className="flex items-center gap-2">
              <p className="bg-buttonPositive flex items-center justify-center rounded-md px-3 py-2 text-xs leading-none text-white">
                {data?.result?.isBan === "not" ? t("active") : t("inactive")}
              </p>
            </div>
          }
        />
        <DetailRow
          hasExtraIcon={false}
          title={t("accountID")}
          value={
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => handleCopy(data?.result?.user_id || "")}
            >
              <IoCopyOutline className="font-english text-mainText scale-125" />
              <p className="text-mainText">{data?.result?.user_id}</p>
            </div>
          }
        />
        <DetailRow
          hasExtraIcon={false}
          title={t("email")}
          value={<p className="text-accentText">{data?.result?.email}</p>}
        />
        <DetailRow
          hasExtraIcon={false}
          title={t("cellphone")}
          value={
            <p className="font-english text-accentText">
              {" "}
              {data?.result?.cellphone}
            </p>
          }
        />
        <DetailRow
          hasExtraIcon={false}
          title={t("irtBalance")}
          value={
            <div className="flex items-end justify-start gap-1">
              <p className="font-english text-mainText">
                {addCommaSeparator(totalsByCoin?.irt) || "0"}
              </p>

              <p className="text-accentText Dark">{getQuoteName("irt")}</p>
            </div>
          }
        />
        <DetailRow
          hasExtraIcon={false}
          title={t("usdBalance")}
          value={
            <div className="flex items-end justify-start gap-1">
              <p className="font-english text-mainText">
                {addCommaSeparator(totalsByCoin?.usd) || "0"}
              </p>

              <p className="text-accentText Dark">{getQuoteName("usd")}</p>
            </div>
          }
        />

        <DetailRow
          hasExtraIcon={false}
          helpIcon={
            <IoIosHelpCircleOutline
              onClick={() => {
                setIsLastDayWithdrawalDrawerOpen(true);
              }}
              className="text-negative mb-2 self-start text-sm"
            />
          }
          title={t("last24HourWithdrawal")}
          value={
            <div className="flex items-end justify-start gap-1">
              <p className="font-english text-mainText">
                {data?.result?.last24hWithdrawVolume}
              </p>

              <p className="text-accentText Dark">{getQuoteName("irt")}</p>
            </div>
          }
        />
        <DetailRow
          hasExtraIcon={false}
          helpIcon={
            <IoIosHelpCircleOutline
              onClick={() => {
                setIsLast30DayWithdrawalDrawerOpen(true);
              }}
              className="text-negative mb-2 self-start text-sm"
            />
          }
          title={t("last30DaysWithdrawal")}
          value={
            <div className="flex items-end justify-start gap-1">
              <p className="font-english text-mainText">
                {data?.result?.last30dWithdrawVolume}
              </p>

              <p className="text-accentText Dark">{getQuoteName("irt")}</p>
            </div>
          }
        />
        <DetailRow
          hasExtraIcon={false}
          helpIcon={
            <IoIosHelpCircleOutline
              onClick={() => {
                setIsTfaDrawerOpen(true);
              }}
              className="text-negative mb-2 self-start text-sm"
            />
          }
          title={t("tfa")}
          value={
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
        <DetailRow
          hasExtraIcon={false}
          title={t("accountCreatedOn")}
          value={
            <CustomDateTime
              isDisplayClock={false}
              timeStamp={data?.result?.registerTime || ""}
            />
          }
        />
      </div>
      <LastDayWithdrawalHelpDrawer
        isOpen={isLastDayWithdrawalDrawerOpen}
        onClose={() => {
          setIsLastDayWithdrawalDrawerOpen(false);
        }}
      />
      <LastMonthWithdrawalHelpDrawer
        isOpen={isLast30DayWithdrawalDrawerOpen}
        onClose={() => {
          setIsLast30DayWithdrawalDrawerOpen(false);
        }}
      />
      <TfaHelpDrawer
        isOpen={isTfaDrawerOpen}
        onClose={() => {
          setIsTfaDrawerOpen(false);
        }}
      />
    </div>
  );
}

export default UserDetailBox;
