/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { CustomQrCode } from "@/components/atoms/customQrCode";
import useClipboard from "@/core/hooks/useClipboard";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataGet_2fa_Data } from "@/core/services/hooks";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdContentCopy, MdOutlineQrCode } from "react-icons/md";
import { RiNumber2 } from "react-icons/ri";

function ActivationLevelTwo() {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();

  const { copyToClipboard } = useClipboard();
  const [isDisplayQr, setIsDisplayQr] = useState(false);

  const { data: data2fa } = useGetUser_dataGet_2fa_Data({
    enabled: isLoggedIn,
  });
  // TODO: Update swagger
  // @ts-ignore
  const tfaQR = data2fa?.result?.qr;
  // @ts-ignore
  const tfaSecret = data2fa?.result?.secret;

  return (
    <div className="mt-10 flex h-fit w-full items-start justify-start">
      <div className="flex flex-col items-start justify-start">
        <div className="flex h-fit w-full items-start justify-start">
          <RiNumber2 className="text-positive min-h-4 min-w-4" />

          <p className="text-mainText mx-2 text-sm">
            {t("tfaLevel2", { add: " + " })}
          </p>
        </div>

        <div className="w-full max-w-[400px]">
          <div className="border-accentText50 mt-4 flex min-h-[50px] w-full max-w-full flex-wrap items-center justify-between gap-2 self-center rounded-md border p-2 px-3">
            <div className="flex items-center justify-start gap-2">
              <div
                className="flex h-7 w-7 cursor-pointer items-center justify-center"
                onClick={() => {
                  copyToClipboard(tfaSecret || "");
                }}
              >
                <MdContentCopy className="text-mainText h-5 w-5" />
              </div>
              <div
                className="flex h-7 w-7 cursor-pointer items-center justify-center"
                onClick={() => {
                  setIsDisplayQr(true);
                }}
              >
                <MdOutlineQrCode className="text-mainText h-5 w-5" />
              </div>
            </div>

            <p
              className="text-mainBrandAlternative text-start text-sm leading-none break-all"
              dir={"ltr"}
            >
              {tfaSecret?.slice(0, 20)}...
            </p>
          </div>
        </div>
        {isDisplayQr ? (
          <AnimatePresence>
            <motion.div
              className="flex w-full flex-col items-center justify-start"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mx-5 mt-5 items-center justify-center bg-white pt-0 pr-0 pb-0 pl-0">
                <CustomQrCode
                  bgColor={"transparent"}
                  containerBorderRadius={0}
                  eyeColor={"#000"}
                  fgColor={"#000"}
                  qrText={tfaQR}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        ) : null}
        {isDisplayQr ? (
          <div
            onClick={() => {
              setIsDisplayQr(false);
            }}
            className="bg-secondBackground mx-5 mt-2 flex h-[22px] w-[calc(100%-38px)] items-center justify-center self-center rounded-b-lg"
          >
            <IoIosArrowDown
              className={clsx(
                "text-mainText h-[16px] w-[16px]",
                isDisplayQr ? "rotate-180" : "",
              )}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ActivationLevelTwo;
