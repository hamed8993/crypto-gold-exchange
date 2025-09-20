import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import { BsAndroid2, BsApple } from "react-icons/bs";

function FooterDownloads() {
  const t = useTranslations();

  return (
    <div className="Dark border-newColor_borderNeutral10 flex gap-3 border-b py-8 lg:py-16">
      <ButtonDefault
        className="w-1/2! lg:w-[380px]!"
        icon={<BsApple className="h-[20px] w-[15px] pb-1" />}
      >
        <span className="text-constantLight text-sm font-normal">
          {t("downloadIosApp")}
        </span>
      </ButtonDefault>

      <ButtonDefault
        className="w-1/2! lg:w-[380px]!"
        icon={<BsAndroid2 className="h-[22px] w-[19px]" />}
      >
        <span className="text-constantLight text-sm font-normal">
          {t("downloadAndroidApp")}
        </span>
      </ButtonDefault>
    </div>
  );
}

export default FooterDownloads;
