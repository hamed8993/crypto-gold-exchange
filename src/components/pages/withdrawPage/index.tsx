"use client";

import { StickyComponent } from "@/components/atoms/stickyComponent";
import PwaPageLayout from "@/components/organisms/layout";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiNetworkLight } from "react-icons/pi";
import BalanceSection from "../../atoms/balanceSection";
import SelectorInput from "../depositPage/components/selectorInput";
import AddressSection from "./components/addressSection";
import CoinsList from "./components/coinList";
import NetworkSelect from "./components/networkSelect";
import QuantitySection from "./components/quantitySection";
import SelectCoin from "./components/selectCoin";
import WithdrawInfoSection from "./components/withdrawInfoSection";
import { useWithdrawContext, WithdrawContextProvider } from "./provider";

interface WithdrawPageProps {
  className?: string;
}

function Component({ className }: WithdrawPageProps) {
  const t = useTranslations();

  const { back } = useRouter();

  const { watch, setValue } = useWithdrawContext();

  const [isSelectAsset, setIsSelectAsset] = useState<boolean>(true);

  const asset = watch("asset");
  const selectedCoin = watch("selectedCoin");
  const selectedNetwork = watch("selectedNetwork");

  return (
    <PwaPageLayout
      hasBackChevron
      hasFooter={false}
      onBackClick={() => {
        if (isSelectAsset) {
          back();
        } else {
          setIsSelectAsset(true);
        }
      }}
      title={t("withdraw")}
      wrapperClassName={className}
    >
      <div className="bg-secondBackground flex w-full flex-1 flex-col items-center justify-between px-3 shadow-none">
        <div className="flex h-fit w-full flex-col items-start justify-start">
          <CoinsList />

          <SelectorInput
            onClick={() => {
              setValue("isCoinDrawerOpen", true);
            }}
            placeholder={t("chooseCoinToDeposit")}
            value={selectedCoin}
          />

          <SelectorInput
            icon={<PiNetworkLight className="text-accentText h-6 w-6" />}
            isDisabled={selectedCoin ? false : true}
            onClick={() => {
              if (selectedCoin) {
                setValue("isNetworkDrawerOpen", true);
              }
            }}
            placeholder={t("chooseNetwork")}
            value={selectedNetwork}
          />

          <SelectCoin />

          <NetworkSelect />

          <AddressSection />

          <QuantitySection
            asset={asset}
            extraComponent={<BalanceSection asset={asset} />}
          />
        </div>

        <StickyComponent className="bg-secondBackground flex w-full p-2">
          <WithdrawInfoSection asset={asset} />
        </StickyComponent>
      </div>
    </PwaPageLayout>
  );
}

const WithdrawPage = ({ ...rest }: WithdrawPageProps) => {
  return (
    <WithdrawContextProvider>
      <Component {...rest} />
    </WithdrawContextProvider>
  );
};

export default WithdrawPage;
