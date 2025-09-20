import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { CgSandClock } from "react-icons/cg";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { RiProhibited2Line } from "react-icons/ri";
import { VscServerProcess } from "react-icons/vsc";
import ClockItem from "../depositDetailsBox/components/clockItem";
import DetailItem from "../depositDetailsBox/components/detailItem";
import DepositAddress from "./components/depositAddress";
import DepositAmount from "./components/depositAmount";
import NetworkDetails from "./components/networkDetails";

interface QrAddressBoxProps {
  address?: string;
  coin?: string;
  network?: string;
  amount?: string;
  time: number;
  asset?: string;
  assetAmount?: string;
  remainingTime: number;
  status: "pending" | "processing" | "canceled" | "rejected" | "completed";
}

function QrAddressBox({
  address,
  coin,
  network,
  amount,
  status,
  remainingTime,
  time,
  asset,
  assetAmount,
}: QrAddressBoxProps) {
  const t = useTranslations();
  const { getQuoteName } = useMarketsNamesData();

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <CgSandClock className="h-4 w-4 text-mainBrand" />;
      case "processing":
        return <VscServerProcess className="h-4 w-4 text-mainBrand" />;
      case "rejected":
        return <RiProhibited2Line className="h-4 w-4 text-negative" />;
      case "canceled":
        return <MdCancel className="h-4 w-4 text-negative" />;
      case "completed":
        return <FaCheckCircle className="h-4 w-4 text-positive" />;
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds > 0) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");

      return `${formattedMinutes}:${formattedSeconds}`;
    } else {
      return "00:00";
    }
  };

  return (
    <div className="mt-4 flex w-full flex-col items-center justify-start rounded-lg bg-surface py-6 dark:bg-surfaceDark">
      <NetworkDetails coin={coin} network={network} />
      <DepositAmount amount={amount} coin={coin} />
      <DepositAddress address={address} />
      <DetailItem
        isLastItem
        isFontEnglish
        title={`${t("quantity")} ${getQuoteName(asset || "")}`}
        value={`${addCommaSeparator(assetAmount || "")}  `}
      />
      <DetailItem
        isLastItem
        icon={renderStatusIcon(status)}
        title={t("status")}
        value={t(status || "pending")}
      />
      {status === "pending" ? (
        <ClockItem time={formatTime(time)} remainingTime={remainingTime} />
      ) : null}
    </div>
  );
}

export default QrAddressBox;
