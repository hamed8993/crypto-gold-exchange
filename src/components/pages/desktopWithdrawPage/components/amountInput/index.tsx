import BalanceSection from "@/components/atoms/balanceSection";
import InputDesktop from "@/components/molecules/inputDesktop";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataBalance } from "@/core/services/hooks";
import Decimal from "decimal.js";
import { useTranslations } from "next-intl";
import { useDesktopWithdrawContext } from "../../provider";

interface AmountInputProps {
  value: string;
  onChange: (...event: unknown[]) => void;
}

function AmountInput({ onChange, value }: AmountInputProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { watch, setValue } = useDesktopWithdrawContext();
  const asset = watch("asset");

  const { data } = useGetUser_dataBalance({ enabled: isLoggedIn });
  const balance = data?.result?.main;
  const assetBalance = balance?.find((item) => item.coin === asset)?.available;

  return (
    <div>
      <InputDesktop
        labelContainerClassName="!bg-mainBackground "
        value={value}
        label={t("amount")}
        iconType="all"
        onAllClick={(value) =>
          setValue(
            "amount",
            Number(new Decimal(assetBalance || 0).times(value)).toString(),
          )
        }
        placeholder={t("enterQuantity")}
        onChange={(value) => onChange(value)}
      />
      <BalanceSection asset={asset} />
    </div>
  );
}

export default AmountInput;
