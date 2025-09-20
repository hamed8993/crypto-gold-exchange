import CustomButton from "@/components/atoms/customButton";
import CustomDrawer from "@/components/atoms/customDrawer";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { IoChevronForward } from "react-icons/io5";
import { useTransactionsHistoryContext } from "../../provider";

function StatusPicker() {
  const t = useTranslations();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { setValue, watch } = useTransactionsHistoryContext();

  const status = watch("status");

  return (
    <Fragment>
      <CustomButton
        className="border-accentText50 flex min-h-10 w-full min-w-24 items-center justify-center rounded-lg border"
        onClick={() => setIsDrawerOpen(true)}
        variant="outline"
      >
        <p>{status || t("chooseStatus")}</p>
      </CustomButton>
      <CustomDrawer
        hasCross={false}
        height="fit-content"
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="flex w-full flex-col gap-3 px-3 py-4">
          <div
            className="flex w-full items-center p-2"
            onClick={() => {
              setValue("status", "completed");
              setIsDrawerOpen(false);
            }}
          >
            <p className="text-mainText w-full text-sm">{t("completed")}</p>
            <div className="flex min-h-10 min-w-10 items-center justify-center">
              {status === "completed" ? (
                <BiCheck className="text-mainText h-7 w-7" />
              ) : (
                <IoChevronForward className="text-accentText h-6 w-6 rtl:rotate-180" />
              )}
            </div>
          </div>
          <div
            className="flex w-full items-center p-2"
            onClick={() => {
              setValue("status", "cancelled");
              setIsDrawerOpen(false);
            }}
          >
            <p className="text-mainText w-full text-sm">{t("canceled")}</p>
            <div className="flex min-h-10 min-w-10 items-center justify-center">
              {status === "cancelled" ? (
                <BiCheck className="text-mainText h-7 w-7" />
              ) : (
                <IoChevronForward className="text-accentText h-6 w-6 rtl:rotate-180" />
              )}
            </div>
          </div>

          <div
            className="flex w-full items-center p-2"
            onClick={() => {
              setValue("status", "rejected");
              setIsDrawerOpen(false);
            }}
          >
            <p className="text-mainText w-full text-sm">{t("rejected")}</p>
            <div className="flex min-h-10 min-w-10 items-center justify-center">
              {status === "rejected" ? (
                <BiCheck className="text-mainText h-7 w-7" />
              ) : (
                <IoChevronForward className="text-accentText h-6 w-6 rtl:rotate-180" />
              )}
            </div>
          </div>
          <div
            className="flex w-full items-center p-2"
            onClick={() => {
              setValue("status", "processing");
              setIsDrawerOpen(false);
            }}
          >
            <p className="text-mainText w-full text-sm">{t("processing")}</p>
            <div className="flex min-h-10 min-w-10 items-center justify-center">
              {status === "processing" ? (
                <BiCheck className="text-mainText h-7 w-7" />
              ) : (
                <IoChevronForward className="text-accentText h-6 w-6 rtl:rotate-180" />
              )}
            </div>
          </div>
        </div>
      </CustomDrawer>
    </Fragment>
  );
}

export default StatusPicker;
