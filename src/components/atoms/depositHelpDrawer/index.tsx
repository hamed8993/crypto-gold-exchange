import CustomDrawer from "@/components/atoms/customDrawer";
import crypto from "@/components/atoms/Lottie/crypto.json";
import Lottie from "lottie-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import GotItButton from "../gotItButton";

interface DepositHelpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function DepositHelpDrawer({ isOpen, onClose }: DepositHelpDrawerProps) {
  const t = useTranslations();
  return (
    <CustomDrawer
      isOpen={isOpen}
      onClose={onClose}
      hasCross={false}
      height="fit-content"
    >
      <div className="flex flex-col items-center justify-between px-8 py-2 pb-4">
        <div className="flex h-1 w-20 rounded-full bg-accentText dark:bg-accentTextDark"></div>
        <div className="mt-8 flex w-full items-center justify-start gap-2">
          <Image
            alt="stopLoss"
            src={"/assets/images/depositIcon.png"}
            width={40}
            height={40}
          />
          <p
            dir="rtl"
            className="text-justify text-xl text-mainText dark:text-mainTextDark"
          >
            {t("deposit")}
          </p>
        </div>
        <p
          dir="rtl"
          className="w-[90%] mt-2 text-justify text-xs/6 text-mainText dark:text-mainTextDark"
        >
          {t("depositHelpText1")}
        </p>
        <p
          dir="rtl"
          className="w-[90%] mt-3 text-justify text-xs/6 text-accentText dark:text-accentTextDark"
        >
          {t("depositHelpText2")}
        </p>
        <div className="mx-auto w-36 h-36 my-4">
          <Lottie
            height={15}
            animationData={crypto}
            loop={true}
            width={15}
            autoPlay={true}
          />
        </div>
        <p
          dir="rtl"
          className="w-[90%] mt-3 text-justify text-xs/6 text-accentText dark:text-accentTextDark"
        >
          {t("depositHelpText3")}
        </p>
        <div className="flex mb-3 w-full mt-3 py-3 justify-start items-center gap-2">
          <Image
            alt="stopLoss"
            src={"/assets/images/clock.png"}
            width={30}
            height={30}
          />
          <p
            dir="rtl"
            className="w-[90%] text-justify text-sm text-mainText dark:text-mainTextDark"
          >
            {t("depositHelpText4")}
          </p>
        </div>

        <GotItButton onClick={onClose} />
      </div>
    </CustomDrawer>
  );
}

export default DepositHelpDrawer;
