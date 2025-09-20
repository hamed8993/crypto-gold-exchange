import LockIcon from "@/components/atoms/svg/lockIcon";
import { useTranslations } from "next-intl";

function FormTopSection() {
  const t = useTranslations();

  return (
    <>
      <p className="text-mainText w-fit text-[40px] font-semibold">
        {t("loginToGoldfino")}
      </p>
      <p className="text-accentText mt-8 text-[12px]">
        {t("makeSureAddressIsRight")}
      </p>
      <div className="bg-bgMuted mt-6 flex h-12 w-[380px] items-center justify-center gap-1 rounded-full">
        <p className="text-mainText text-[20px]">{"goldfino.com/login"}</p>
        <p dir="ltr" className="text-mainBrand text-[20px]">
          {"https://"}
        </p>
        <LockIcon />
      </div>
      <div className="bg-borderDefault mt-11 mb-8 flex h-px w-[380px]"></div>
    </>
  );
}

export default FormTopSection;
