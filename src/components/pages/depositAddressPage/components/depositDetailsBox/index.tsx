import { useNotification } from "@/core/providers/notificationProvider";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { CgSandClock } from "react-icons/cg";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel, MdOutlineContentCopy } from "react-icons/md";
import { RiProhibited2Line } from "react-icons/ri";
import { VscServerProcess } from "react-icons/vsc";
import ClockItem from "./components/clockItem";
import DetailItem from "./components/detailItem";

interface DepositDetailsBoxProps {
  address?: string;
  coin?: string;
  network?: string;
  amount?: string;
  actual_equivalent?: string;
  status: "pending" | "processing" | "canceled" | "rejected" | "completed";
  asset?: string;
  assetAmount?: string;
  actual_amount?: string;
  tx?: string;
  time?: string;
  remainingTime: number;
}

function DepositDetailsBox({
  address,
  amount,
  coin,
  network,
  time,
  status,
  remainingTime,
  actual_equivalent,
  asset,
  assetAmount,
  actual_amount,
  tx,
}: DepositDetailsBoxProps) {
  const t = useTranslations();
  const { showSuccess } = useNotification();

  const handleCopy = (copyValue: string) => {
    navigator.clipboard.writeText(copyValue);
    showSuccess(t("successfullyCopied"));
  };

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

  return (
    <div className="mt-3 flex w-full flex-col items-center justify-start rounded-lg bg-surface dark:bg-surfaceDark">
      {status === "pending" ? (
        <ClockItem time={time} remainingTime={remainingTime} />
      ) : null}
      <DetailItem
        icon={renderStatusIcon(status)}
        title={t("status")}
        value={t(status || "pending")}
      />
      <DetailItem
        icon={
          <MdOutlineContentCopy
            onClick={() => {
              handleCopy(address || "");
            }}
            className="h-4 w-4 text-mainBrand"
          />
        }
        title={t("address")}
        isFontEnglish
        value={address?.slice(0, 25) + "..."}
      />
      <DetailItem
        isFontEnglish
        title={`${t("quantity")} ${asset?.toUpperCase()}`}
        value={`${addCommaSeparator(assetAmount || "")}  `}
      />
      <DetailItem
        isFontEnglish
        title={`${t("equivalentAmount")} ${coin?.toUpperCase()}`}
        value={`${addCommaSeparator(amount || "")}`}
      />

      {actual_equivalent ? (
        <DetailItem
          isFontEnglish
          title={t("receivedQuantity")}
          value={`${addCommaSeparator(actual_amount || "")} ${asset}`}
        />
      ) : null}

      {actual_equivalent ? (
        <DetailItem
          isFontEnglish
          title={t("chargedEquivalent")}
          value={`${addCommaSeparator(actual_equivalent || "")} ${coin}`}
        />
      ) : null}
      {tx ? (
        <DetailItem
          icon={
            <MdOutlineContentCopy
              onClick={() => {
                handleCopy(tx || "");
              }}
              className="h-4 w-4 text-mainBrand"
            />
          }
          title={t("tx")}
          isFontEnglish
          value={tx?.slice(0, 25) + "..."}
        />
      ) : null}
      <DetailItem title={t("coinName")} value={coin} />
      <DetailItem title={t("network")} isLastItem value={network} />
    </div>
  );
}

export default DepositDetailsBox;
