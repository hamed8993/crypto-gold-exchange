"use client";

import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataBalance } from "@/core/services/hooks";
import { useEffect, useState } from "react";
import AccountType from "./components/accountType";
import Buttons from "./components/buttons";
import PieAndDetails from "./components/pieAndDetails";
import ProfileBox from "./components/profileBox";
import WalletDetails from "./components/walletDetails";

interface ProfilePageDesktopProps {
  className?: string;
}

type pieDataProps = {
  color: string;
  label: string;
  value: number;
};

type UserWallet = {
  coin: string;
  in_order: string;
  mainBalance: string;
  marginBalance: string;
  pendingWithdraw: string;
  pieData: Array<pieDataProps>;
  total: string;
}[];

function ProfilePageDesktop({ className }: ProfilePageDesktopProps) {
  const { isLoggedIn } = useAuth();

  const [userWallet, setUserWallet] = useState<UserWallet>([]);

  const { data: balanceDataArray } = useGetUser_dataBalance({
    enabled: isLoggedIn,
  });

  useEffect(() => {
    const userWalletTemp: UserWallet = [];
    balanceDataArray?.result?.main?.forEach((mainItem) => {
      const marginItem = balanceDataArray?.result?.margin?.find(
        (m) => m.coin === mainItem.coin,
      );

      if (marginItem) {
        const mainBalance = parseFloat(mainItem.total);
        const marginBalance = parseFloat(marginItem.total);

        userWalletTemp.push({
          coin: mainItem.coin,
          in_order: marginItem.in_order.toString(),
          mainBalance: mainBalance.toString(),
          marginBalance: marginBalance.toString(),
          pendingWithdraw: mainItem.pendingWithdraw.toString(),
          pieData: [
            {
              color: "#2e7d32",
              label: "inOrder",
              value: Number(marginItem.in_order.toString()),
            },
            {
              color: "#848e9c",
              label: "availableMargin",
              value:
                Number(marginBalance.toString()) -
                Number(marginItem.in_order.toString()),
            },
            {
              color: "#b71c1c",
              label: "pendingWithdraw",
              value: Number(mainItem.pendingWithdraw.toString()),
            },
            {
              color: "#0d77e7",
              label: "availableMain",
              value:
                Number(mainBalance.toString()) -
                Number(mainItem.pendingWithdraw.toString()),
            },
          ],
          total: (mainBalance + marginBalance).toString(),
        });
      }
    });

    setUserWallet(userWalletTemp);
  }, [balanceDataArray?.result]);

  return (
    <DesktopPageLayout className={className} hasFooter hasHeader hasSideMenu>
      <div className="flex h-full w-full flex-col items-center justify-start">
        <ProfileBox />

        <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
          {userWallet?.map((item, index) => {
            return (
              <div
                className="bg-surface mt-3 flex w-full flex-col items-start justify-start gap-3 rounded-xl p-4 pb-2"
                key={index}
              >
                <AccountType coin={item?.coin} />

                <PieAndDetails item={item} />

                <div className="bg-accentText50 my-2 flex h-px w-full self-center" />

                {item && <WalletDetails item={item} />}

                <Buttons coin={item?.coin} />
              </div>
            );
          })}
        </div>
      </div>
    </DesktopPageLayout>
  );
}

export default ProfilePageDesktop;
