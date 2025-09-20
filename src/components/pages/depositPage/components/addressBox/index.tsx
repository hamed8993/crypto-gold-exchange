import { useTranslations } from "next-intl";
import { MdContentCopy } from "react-icons/md";
import { useDepositContext } from "../../provider";
import { useNotification } from "@/core/providers/notificationProvider";

interface AddressBoxProps {
  isDisplayQrCode: boolean;
  address: string;
}

function AddressBox({ isDisplayQrCode, address }: AddressBoxProps) {
  const t = useTranslations();
  const { watch } = useDepositContext();
  const { showSuccess } = useNotification();

  const coin = watch("coin");

  const handleCopy = (copyValue: string) => {
    navigator.clipboard.writeText(copyValue);
    showSuccess(t("successfullyCopied"));
  };

  return (
    <>
      {isDisplayQrCode ? (
        <div className="mt-4 flex h-24 w-full flex-col items-start justify-between rounded-lg bg-surface p-3 dark:bg-surfaceDark">
          <p className="text-sm text-mainText dark:text-mainTextDark">
            {t("coinDepositAddress")}
            {coin?.toUpperCase()}
          </p>
          <div className="flex w-full items-center justify-between gap-2 px-2">
            <div
              onClick={() => {
                handleCopy(address);
              }}
              className="flex h-8 w-8 items-center justify-center"
            >
              <MdContentCopy className="h-6 w-6 text-accentText dark:text-accentTextDark" />
            </div>
            <p className="break-all font-english text-sm text-mainText dark:text-mainTextDark">
              {address}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AddressBox;
