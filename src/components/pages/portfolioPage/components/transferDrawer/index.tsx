import CustomDrawer from "@/components/atoms/customDrawer";
import CustomInput from "@/components/atoms/customInput";
import { useBalance } from "@/core/hooks/useBalance";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { addInputCommaSeparator } from "@/core/utilities/addInputCommaSeparator";
import { useTranslations } from "next-intl";
import { useState } from "react";
import BalanceDetails from "./components/balanceDetails";
import Tabs from "./components/tabs";
import Title from "./components/title";
import TransferButton from "./components/transferButton";

interface TransferDrawerProps {
  asset?: string;
  isOpen: boolean;
  onClose: () => void;
}

function TransferDrawer({ asset, isOpen, onClose }: TransferDrawerProps) {
  const t = useTranslations();

  const { getQuoteName } = useMarketsNamesData();

  const [amount, setTransferAssetQuantity] = useState<string>("");
  const [isMainToMargin, setIsMainToMargin] = useState<boolean>(true);
  const [walletType, setWalletType] = useState<"margin" | "main">("main");

  const { dataBalance } = useBalance();

  const availableMain =
    dataBalance?.result?.main?.find((m) => m.coin === asset)?.available || "0";

  const availableMargin =
    dataBalance?.result?.margin?.find((m) => m.coin === asset)?.available ||
    "0";

  const selectAll = () => {
    if (isMainToMargin) {
      setTransferAssetQuantity(addCommaSeparator(availableMain));
    } else {
      setTransferAssetQuantity(addCommaSeparator(availableMargin));
    }
  };

  return (
    <CustomDrawer height="fit-content" isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full flex-col justify-between gap-3 px-3 pb-4">
        <div className="flex flex-col gap-4 overflow-auto">
          <Title asset={asset} />

          <Tabs
            isMainToMargin={isMainToMargin}
            onMainClick={() => {
              setIsMainToMargin(true);
              setWalletType("main");
            }}
            onMarginClick={() => {
              setIsMainToMargin(false);
              setWalletType("margin");
            }}
          />

          <BalanceDetails
            asset={asset}
            availableMain={availableMain}
            title={t("mainWalletTitle")}
          />

          <BalanceDetails
            asset={asset}
            availableMain={availableMargin}
            title={t("marginWalletTitle")}
          />

          <CustomInput
            icon={
              <p className="h-10 self-center text-sm text-positive">
                {t("all")}
              </p>
            }
            inputClassName={
              amount
                ? "font-english text-[18px]! px-3! h-12 min-h-12"
                : "h-12 min-h-12"
            }
            inputMode="decimal"
            label={""}
            maxLength={15}
            onChange={(e) =>
              setTransferAssetQuantity(addInputCommaSeparator(e.target))
            }
            onIconClick={selectAll}
            placeholder={t("enterTransferQuantity", {
              coin: getQuoteName(asset || "") || "",
            })}
            value={amount}
            wrapperClassName="min-h-12 h-12"
          />
        </div>

        <TransferButton
          amount={amount}
          asset={asset}
          onClose={onClose}
          setTransferAssetQuantity={() => {
            setTransferAssetQuantity("");
          }}
          walletType={walletType}
        />
      </div>
    </CustomDrawer>
  );
}

export default TransferDrawer;
