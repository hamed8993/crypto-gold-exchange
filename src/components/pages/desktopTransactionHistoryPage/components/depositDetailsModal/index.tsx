import CustomModal, { CustomModalProps } from "@/components/atoms/customModal";
import TitleValueModal from "@/components/atoms/titleValueModal";
import { ArrayElement } from "@/core/constants/constants";
import { GetDepositHistory } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useConvertMillisecondToLocal } from "@/core/utilities/convertTimestamp";
import { useTranslations } from "next-intl";

interface DetailsModalProps
  extends Omit<CustomModalProps, "children" | "size"> {
  values?: ArrayElement<GetDepositHistory["result"]>;
}

function DetailsModal({ isOpen, onClose, values }: DetailsModalProps) {
  const t = useTranslations();
  const { convertMillisecondToLocal } = useConvertMillisecondToLocal();
  return (
    <CustomModal title={t("deposit")} isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full w-full flex-col py-4">
        <div className="scrollbar-hide flex flex-col gap-1 overflow-auto px-2">
          <TitleValueModal
            title={t("address")}
            valueClassName="font-english"
            value={values?.address || "--"}
            type="vertical"
            hasBorder
          />
          <TitleValueModal
            title={t("symbol")}
            valueClassName="font-english"
            value={
              values
                ? values.asset.toUpperCase() +
                  " / " +
                  values.payment_currency.toUpperCase()
                : "--"
            }
            hasBorder
          />
          <TitleValueModal
            title={t("amount")}
            valueClassName="font-english"
            value={addCommaSeparator(values?.amount || "") || "--"}
            hasBorder
          />
          <TitleValueModal
            title={t("equivalent")}
            valueClassName="font-english"
            value={addCommaSeparator(values?.equivalent || "") || "--"}
            hasBorder
          />
          <TitleValueModal
            title={t("rate")}
            valueClassName="font-english"
            value={addCommaSeparator(values?.rate || "") || "--"}
            hasBorder
          />
          <TitleValueModal
            title={t("date")}
            value={convertMillisecondToLocal(values?.created_at).date || "--"}
            hasBorder
          />
          <TitleValueModal
            title={t("deposit_id")}
            valueClassName="font-english"
            value={values?.deposit_id || "--"}
            hasBorder
          />
          <TitleValueModal
            title={t("actual_amount")}
            value={addCommaSeparator(values?.actual_amount || "") || "0"}
            hasBorder
            valueClassName="font-english"
          />
          <TitleValueModal
            title={t("actual_equivalent")}
            value={addCommaSeparator(values?.actual_equivalent || "") || "0"}
            hasBorder
            valueClassName="font-english"
          />
          <TitleValueModal
            title={t("confirmations")}
            value={values?.confirmations || "--"}
            hasBorder
          />
          <TitleValueModal
            title={t("network")}
            value={values?.network?.toUpperCase() || "--"}
            hasBorder
          />
          <TitleValueModal
            title={t("status")}
            value={values?.status ? t(values.status) : "--"}
            hasBorder
          />
          <TitleValueModal
            title={t("tx")}
            value={values?.tx ? t(values.status || "") : "--"}
            hasBorder
          />
        </div>
      </div>
    </CustomModal>
  );
}
export default DetailsModal;
