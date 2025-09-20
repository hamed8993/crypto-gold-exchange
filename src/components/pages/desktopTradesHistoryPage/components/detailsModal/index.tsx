import CustomModal, { CustomModalProps } from "@/components/atoms/customModal";
import TitleValueModal from "@/components/atoms/titleValueModal";
import { ArrayElement } from "@/core/constants/constants";
import { GetHistoryPositions } from "@/core/services/types";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";

interface DetailsModalProps
  extends Omit<CustomModalProps, "children" | "size"> {
  values?: ArrayElement<GetHistoryPositions["result"]>;
}

function DetailsModal({ isOpen, onClose, values }: DetailsModalProps) {
  const t = useTranslations();
  return (
    <CustomModal title={t("trade")} isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full w-full flex-col py-4">
        <div className="scrollbar-hide flex flex-col gap-1 overflow-auto px-2">
          <TitleValueModal
            title={t("closedTradesHistory")}
            value={
              values?.base.toUpperCase() + " / " + values?.quote.toUpperCase()
            }
            hasBorder
          />
          <TitleValueModal
            title={t("entryPrice")}
            value={addCommaSeparator(values?.entryPrice || "")}
            hasBorder
          />
          <TitleValueModal
            title={t("leverage")}
            value={values?.leverage}
            hasBorder
          />
          <TitleValueModal
            title={t("volume")}
            value={values?.subPositions?.length || 0}
            hasBorder
          />
          <TitleValueModal
            title={t("orderId")}
            value={values?.orderId}
            hasBorder
            type="vertical"
          />
          <TitleValueModal
            title={t("side")}
            value={values?.side ? t(values?.side) : "--"}
            hasBorder
          />
          <TitleValueModal
            title={t("slPrice")}
            value={addCommaSeparator(values?.slPrice || "") || "--"}
            hasBorder
          />
          <TitleValueModal
            title={t("tpPrice")}
            value={addCommaSeparator(values?.tpPrice || "") || "--"}
            hasBorder
          />
        </div>
      </div>
    </CustomModal>
  );
}
export default DetailsModal;
