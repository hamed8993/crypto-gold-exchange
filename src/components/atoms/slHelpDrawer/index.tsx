import CustomDrawer from "@/components/atoms/customDrawer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import GotItButton from "../gotItButton";
interface SlHelpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function SlHelpDrawer({ isOpen, onClose }: SlHelpDrawerProps) {
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
            src={"/assets/images/stopLoss.png"}
            width={40}
            height={40}
          />
          <p
            dir="rtl"
            className="text-justify text-xl text-mainText dark:text-mainTextDark"
          >
            {t("stopLoss")}
          </p>
        </div>
        <p
          dir="rtl"
          className="w-[90%] mt-2 text-justify text-xs/6 text-mainText dark:text-mainTextDark"
        >
          {t("slHelpDescription1")}
        </p>
        <p
          dir="rtl"
          className="w-[90%] mt-3 text-justify text-xs/6 text-accentText dark:text-accentTextDark"
        >
          {t("slHelpDescription2")}
        </p>
        <Image
          alt="Abstract charts image"
          className="w-full max-w-[1200px] scale-90 animate-revealClip md:top-12 lg:top-20 xl:top-16"
          height={66}
          src={"/assets/images/sl.webp"}
          width={135}
        />
        <p
          dir="rtl"
          className="w-[90%] mb-4 text-justify text-xs/6 text-mainText dark:text-mainTextDark"
        >
          {t("slHelpDescription3")}
        </p>
        <GotItButton onClick={onClose} />
      </div>
    </CustomDrawer>
  );
}

export default SlHelpDrawer;
