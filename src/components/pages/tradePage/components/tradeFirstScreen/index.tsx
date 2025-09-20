import { localeType } from "@/app/[locale]/layout";
import LoginRegisterDrawer from "@/components/molecules/loginRegisterDrawer";
import PwaPageLayout from "@/components/organisms/layout";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { usePriceDetail } from "@/core/hooks/usePriceDetail";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import {
  usePostOrderCancel,
  usePostOrderSet_group_close_order,
} from "@/core/services/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTradeContext } from "../../provider";
import BuySellTabs from "./components/buySellTabs";
import HeaderSideComponent from "./components/headerSideComponent";
import HeaderTitle from "./components/headerTitle";
import HistoryComponent from "./components/historyComponent";
import Loading from "./components/loading";
import TradingViewBox from "./components/tradingView";

interface TradeFirstScreenProps {
  className?: string;
  quoteAsset: string;
  setIsSecondPage: (value: boolean) => void;
  setSide: (value: "long" | "short") => void;
  symbol: string;
}

function TradeFirstScreen({
  className,
  quoteAsset,
  setIsSecondPage,
  setSide,
  symbol,
}: TradeFirstScreenProps) {
  const { locale } = useUrl();

  const { back } = useRouter();

  const { isLoggedIn } = useAuth();

  const { reset } = useTradeContext();

  const { getSpread } = usePriceDetail();

  const { getMarketName } = useMarketsNamesData();

  const [isWalletOpen, setIsWalletOpen] = useState<boolean>(false);
  const [isAuthWarnOpen, setIsAuthWarnOpen] = useState<boolean>(false);

  const { isPending: closePositionPending } =
    usePostOrderSet_group_close_order();

  const { isPending: closeOrderPending } = usePostOrderCancel();

  const isClosePending = closeOrderPending || closePositionPending;

  const spread = getSpread(symbol, quoteAsset);

  const name = getMarketName(symbol)[locale as localeType];

  return (
    <PwaPageLayout
      backWrapperClassName={"min-w-14 flex justify-start!"}
      containerClassName="pr-0 pl-0 pb-4 bg-secondBackground "
      hasBackChevron
      hasFooter={true}
      isWalletOpen={isWalletOpen}
      onBackClick={() => {
        setIsSecondPage(false);
        reset();
        back();
      }}
      sideComponent={
        <HeaderSideComponent
          onWalletClick={() => setIsWalletOpen((prev) => !prev)}
          symbol={symbol}
        />
      }
      title={
        <HeaderTitle name={name} quoteAsset={quoteAsset} symbol={symbol} />
      }
      wrapperClassName={className}
    >
      <div className="bg-secondBackground relative flex h-fit w-full flex-col items-center justify-start overflow-y-auto">
        <BuySellTabs
          onLongClick={() => {
            if (isLoggedIn) {
              setIsSecondPage(true);
              setSide("long");
            } else {
              setIsAuthWarnOpen(true);
            }
          }}
          onShortClick={() => {
            if (isLoggedIn) {
              setIsSecondPage(true);
              setSide("short");
            } else {
              setIsAuthWarnOpen(true);
            }
          }}
          spread={spread}
          symbol={symbol}
        />

        <TradingViewBox showToolBar={false} />

        <HistoryComponent
          onHistoryClick={() => {
            setIsAuthWarnOpen(true);
          }}
        />

        <Loading isClosePending={isClosePending} />
      </div>

      <LoginRegisterDrawer
        isOpen={isAuthWarnOpen}
        onClose={() => {
          setIsAuthWarnOpen(false);
        }}
      />
    </PwaPageLayout>
  );
}

export default TradeFirstScreen;
