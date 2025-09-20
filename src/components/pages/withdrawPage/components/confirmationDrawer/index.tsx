import AlertBox from "@/components/atoms/alertBox";
import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import { useMarketsNamesData } from "@/core/hooks/useGetName";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";
import { FaRegCheckSquare } from "react-icons/fa";

interface ConfirmationDrawerProps {
  address: string;
  asset: string;
  coin: string;
  equivalent: string;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedNetwork: string;
  quantity: string;
}

function ConfirmationDrawer({
  address,
  asset,
  coin,
  equivalent,
  isLoading,
  isOpen,
  onClose,
  onConfirm,
  quantity,
  selectedNetwork,
}: ConfirmationDrawerProps) {
  const t = useTranslations();

  const { getName, getQuoteName } = useMarketsNamesData();

  return (
    <CustomDrawer
      hasCross={false}
      height="fit-content"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full flex-col items-center justify-between pb-4">
        <div className="flex w-full flex-col items-start justify-start pb-8">
          <div className="bg-accentText mt-2 flex h-1 w-[40%] self-center" />

          <div className="mt-6 flex w-full items-center justify-start gap-1 px-3">
            <FaRegCheckSquare className="text-accentText h-4 w-4" />

            <p className="text-accentText text-sm">
              {t("withdrawalConfirmationText1", {
                asset: getQuoteName(asset) || "",
                coin: coin?.toUpperCase(),
                quantity: addCommaSeparator(quantity),
              })}
            </p>
          </div>

          <div className="mt-6 flex w-full items-center justify-between px-3">
            <p className="text-accentText text-sm">
              {t("withdrawalConfirmationText2", {
                enCoin: getName(coin).enName || "",
                faCoin: getName(coin).faName || "",
              })}
            </p>

            <div className="flex items-center justify-start gap-1">
              <p className="font-english text-accentText text-xs">
                {coin?.toUpperCase()}
              </p>
              <p className="font-english text-mainBrandAlternative text-lg">
                {equivalent}
              </p>
            </div>
          </div>

          <div className="mt-4 flex w-full items-center justify-between px-3">
            <p className="text-accentText text-sm">{t("withdrawalNetwork")}</p>
            <p className="font-english text-mainText text-lg">
              {selectedNetwork.toUpperCase()}
            </p>
          </div>

          <div className="mt-4 flex w-full flex-col items-start justify-start px-3">
            <p className="text-accentText text-sm">{t("withdrawAddress")}</p>
            <p className="font-english text-mainText self-end text-sm">
              {address}
            </p>
          </div>

          <div className="mt-3 flex w-full items-center justify-center px-3">
            <AlertBox data={[t("withdrawConfirmationAlertText")]} />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-2 px-2">
          <CustomButton
            className="flex h-10 w-full items-center justify-center"
            isDisabled={isLoading}
            isLoading={isLoading}
            onClick={onConfirm}
            variant="primary"
          >
            <p className="text-xs text-white">{t("confirm")}</p>
          </CustomButton>
          <CustomButton
            className="border-accentText50 flex h-10 w-full items-center justify-center"
            onClick={onClose}
            variant="outline"
          >
            <p className="text-xs text-white">{t("cancel")}</p>
          </CustomButton>
        </div>
      </div>
    </CustomDrawer>
  );
}

export default ConfirmationDrawer;
