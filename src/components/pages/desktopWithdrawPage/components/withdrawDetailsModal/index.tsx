import AlertBox from "@/components/atoms/alertBox";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { deleteCommas } from "@/core/utilities/deleteCommas";
import { useTranslations } from "next-intl";
import { FaRegCheckSquare } from "react-icons/fa";
import { useDesktopWithdrawContext } from "../../provider";

function WithdrawDetailsModal() {
  const t = useTranslations();

  const { watch } = useDesktopWithdrawContext();
  const asset = watch("asset");
  const coin = watch("coin");
  const network = watch("network");
  const amount = watch("amount");
  const address = watch("address");

  const { getQuoteName, getName } = useMarketsNamesData();

  return (
    <div className="flex w-full flex-col items-start justify-start pb-8">
      <div className="mt-6 flex w-full items-start justify-start gap-3 px-3">
        <FaRegCheckSquare className="text-accentText h-4 w-4" />
        <p className="text-accentText text-sm">
          {t("withdrawalConfirmationText1", {
            quantity: addCommaSeparator(amount),
            asset: getQuoteName(asset) || "",
            coin: coin?.toUpperCase(),
          })}
        </p>
      </div>

      <div className="mt-6 flex w-full items-center justify-between px-3">
        <p className="text-accentText text-sm">
          {t("withdrawalConfirmationText2", {
            faCoin: getName(coin).faName || "",
            enCoin: getName(coin).enName || "",
          })}
        </p>
        <div className="flex items-center justify-start gap-1">
          <p className="font-english text-accentText text-xs">
            {coin?.toUpperCase()}
          </p>
          <p className="font-english text-mainBrandAlternative text-lg">
            {deleteCommas(amount)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex w-full items-center justify-between px-3">
        <p className="text-accentText text-sm">{t("withdrawalNetwork")}</p>
        <p className="font-english text-mainText text-lg">
          {network.toUpperCase()}
        </p>
      </div>
      <div className="mt-4 flex w-full flex-col items-start justify-start px-3">
        <p className="text-accentText text-sm">{t("withdrawAddress")}</p>
        <p className="font-english text-mainText self-end text-sm">{address}</p>
      </div>
      <div className="mt-3 flex w-full items-center justify-center px-3">
        <AlertBox data={[t("withdrawConfirmationAlertText")]} />
      </div>
    </div>
  );
}

export default WithdrawDetailsModal;
