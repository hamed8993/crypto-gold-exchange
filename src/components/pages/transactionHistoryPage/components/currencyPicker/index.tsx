import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import CustomInput from "@/components/atoms/customInput";
import EmptyView from "@/components/atoms/emptyView";
import LoadingView from "@/components/atoms/loadingView";
import useUrl from "@/core/hooks/useUrl";
import { useGetGet_available_coins } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useTransactionsHistoryContext } from "../../provider";
import CurrencyDrawerRow from "../currencyDrawerRow";

function CurrencyPicker() {
  const t = useTranslations();
  const { locale } = useUrl();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { watch } = useTransactionsHistoryContext();

  const payment_currency = watch("payment_currency");

  const {
    data: availableCoins,
    isLoading: isLoadingMarkets,
    error: errorMarkets,
  } = useGetGet_available_coins();
  const coins = availableCoins?.result || [];

  const dataToDisplay = coins
    .filter((item) => {
      return (
        item.symbol.includes(searchTerm) ||
        item.name_en.includes(searchTerm) ||
        item.name_fa.includes(searchTerm)
      );
    })
    .sort((a, b) => {
      return b.symbol.localeCompare(a.symbol);
    });

  return (
    <Fragment>
      <CustomButton
        className="border-accentText50 flex min-h-10 w-full min-w-24 items-center justify-center rounded-lg border"
        onClick={() => setIsDrawerOpen(true)}
        variant="outline"
      >
        <p>{payment_currency || t("choosePaymentCurrency")}</p>
      </CustomButton>
      <CustomDrawer
        hasCross={false}
        height="70%"
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-start px-3 py-4">
          <CustomInput
            inputClassName="h-10"
            maxLength={50}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder={t("search")}
            value={searchTerm}
            wrapperClassName="h-10 mb-2"
          />
          <div className="w-full gap-2 overflow-auto">
            {isLoadingMarkets || errorMarkets ? (
              <LoadingView />
            ) : dataToDisplay.length === 0 ? (
              <EmptyView wrapperClassName="min-h-96" />
            ) : (
              dataToDisplay.map((item, index) => (
                <CurrencyDrawerRow
                  coin={locale === "fa" ? item.name_fa : item.name_en}
                  icon={
                    <Image
                      alt="gold"
                      className="rounded-full"
                      height={40}
                      src={`/assets/images/${item.symbol}.svg`}
                      width={40}
                    />
                  }
                  key={index}
                  onClose={() => setIsDrawerOpen(false)}
                  symbol={item.symbol.toUpperCase()}
                />
              ))
            )}
          </div>
        </div>
      </CustomDrawer>
    </Fragment>
  );
}

export default CurrencyPicker;
