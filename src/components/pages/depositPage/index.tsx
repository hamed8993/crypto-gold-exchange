/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import CustomButton from "@/components/atoms/customButton";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import CreditCard from "@/components/atoms/svg/creditCard";
import PwaPageLayout from "@/components/organisms/layout";
import { RoutesName } from "@/core/constants/routes";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import useUrl from "@/core/hooks/useUrl";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { usePostDeposit } from "@/core/services/hooks";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiNetworkLight } from "react-icons/pi";
import SelectAssetsTab from "../../atoms/selectAssetDrawer";
import QuantityInput from "../../molecules/quantityInput";
import Drawers from "./components/drawers";
import SelectorInput from "./components/selectorInput";
import { DepositContextProvider, useDepositContext } from "./provider";

interface DepositPageComponentProps {
  className?: string;
}
function DepositPageComponent({ className }: DepositPageComponentProps) {
  const t = useTranslations();
  const { locale } = useUrl();
  const { back, push } = useRouter();
  const { showError } = useNotification();
  const { getQuoteName } = useMarketsNamesData();
  const { getErrorMessages } = useGetAPIMessages();

  const { watch, setValue } = useDepositContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelectAsset, setIsSelectAsset] = useState<boolean>(true);
  const [isSelectCoinVisible, setIsSelectCoinVisible] =
    useState<boolean>(false);

  const asset = watch("asset");
  const coin = watch("coin");
  const depositQuantity = watch("depositQuantity");
  const network = watch("network");

  const isDisplayQrCode = !!(coin && network && depositQuantity);

  const { mutate, isPending } = usePostDeposit({
    onError: (error) => {
      // @ts-ignore
      showError(getErrorMessages(error.message.error));
    },
    onSuccess: (data) => {
      push(
        `/${locale}/${RoutesName.depositAddress}?depositId=${data?.result?.deposit_id}`,
      );
      setValue("generatedAddress", data?.result?.address);
      setValue("asset", "");
    },
  });

  const generateAddress = () => {
    mutate({
      requestBody: {
        asset: asset,
        amount: deleteCommas(depositQuantity),
        network: network,
        payment_currency: coin,
      },
    });
  };

  return (
    <PwaPageLayout
      hasBackChevron
      hasFooter={false}
      onBackClick={
        isSelectCoinVisible
          ? () => {
              setIsSelectCoinVisible(false);
            }
          : !isSelectAsset
            ? () => {
                setIsSelectAsset(true);
              }
            : back
      }
      onTitleIconClick={() => {
        setIsOpen(true);
      }}
      title={t("deposit")}
      titleHasIcon
      wrapperClassName={className}
    >
      <main>
        <div className="flex h-[calc(100vh-140px)] flex-col overflow-y-hidden bg-secondBackground px-2 dark:bg-secondBackgroundDark">
          <SelectorInput
            hasChevron={false}
            icon={<CreditCard color="#848e9c" size={20} />}
            placeholder={t("chooseAccount")}
          />

          <SelectAssetsTab
            asset={asset}
            selectCoin={(value) => setValue("asset", value)}
          />

          {asset ? (
            <QuantityInput
              labelContainerClassName="bg-secondBackground dark:bg-secondBackgroundDark"
              maxLength={15}
              quantity={depositQuantity}
              setValue={(value) => setValue("depositQuantity", value)}
              title={`${t("quantity")} ${getQuoteName(asset)}`}
            />
          ) : null}

          <SelectorInput
            onClick={() => {
              setValue("isSelectCoinDrawerOpen", true);
            }}
            placeholder={t("chooseCoinToDeposit")}
            value={coin}
          />

          <SelectorInput
            icon={
              <PiNetworkLight className="h-6 w-6 text-accentText dark:text-accentTextDark" />
            }
            isDisabled={coin ? false : true}
            onClick={() => {
              if (coin) {
                setValue("isSelectNetworkDrawerOpen", true);
              }
            }}
            placeholder={t("chooseNetwork")}
            value={network}
          />
        </div>
      </main>

      <StickyComponent className="flex w-full bg-secondBackground p-2 dark:bg-secondBackgroundDark">
        <div className="flex h-16 w-full flex-col items-center justify-center px-3">
          <CustomButton
            className="h-12 rounded-md bg-positive"
            isDisabled={!isDisplayQrCode || isPending}
            isLoading={isPending}
            onClick={generateAddress}
            variant="primary"
          >
            <p>{t("generateAddress")}</p>
          </CustomButton>
        </div>
      </StickyComponent>

      <Drawers
        isDisplayQrCode={isDisplayQrCode}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </PwaPageLayout>
  );
}

const DepositPage = ({ ...rest }: DepositPageComponentProps) => {
  return (
    <DepositContextProvider>
      <DepositPageComponent {...rest} />
    </DepositContextProvider>
  );
};

export default DepositPage;
