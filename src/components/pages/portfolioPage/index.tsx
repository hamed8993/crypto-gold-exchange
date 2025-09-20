"use client";

import PwaPageLayout from "@/components/organisms/layout";
import { useBalance } from "@/core/hooks/useBalance";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import AssetItem from "./components/assetItem";
import { PortfolioContextProvider } from "./provider";

export type walletType = "main" | "margin";

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

interface PortfolioPageProps {
  className?: string;
}

export const wallets = ["Main", "Margin"];

function PortfolioPageComponent({ className }: PortfolioPageProps) {
  const t = useTranslations();

  const [userWallet, setUserWallet] = useState<UserWallet>([]);

  const { dataBalance } = useBalance();

  console.log(dataBalance);

  useEffect(() => {
    const userWalletTemp: UserWallet = [];
    dataBalance?.result?.main?.forEach((mainItem) => {
      const marginItem = dataBalance?.result?.margin?.find(
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
  }, [dataBalance]);

  return (
    <PwaPageLayout
      containerClassName="pr-3 pl-3"
      title={t("portfolio")}
      wrapperClassName={className}
    >
      {userWallet?.map((item) => {
        return <AssetItem item={item} key={item.coin} />;
      })}
    </PwaPageLayout>
  );
}

const PortfolioPage = ({ ...props }: PortfolioPageProps) => {
  return (
    <PortfolioContextProvider>
      <PortfolioPageComponent {...props} />
    </PortfolioContextProvider>
  );
};

export default PortfolioPage;
