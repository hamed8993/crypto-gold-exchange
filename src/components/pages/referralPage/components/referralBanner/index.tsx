import CustomButton from "@/components/atoms/customButton";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaPeopleArrows, FaPeopleGroup } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";

function ReferralBanner() {
  const t = useTranslations();

  return (
    <div className="border-border flex w-full flex-col rounded-lg border-2 p-3">
      <div className="flex w-full items-center justify-between">
        <p className="text-mainText text-justify text-base">
          {t("referralBoxTitle")}
        </p>
        <Image
          alt="new_ref"
          height={120}
          src={"/assets/images/new_ref.webp"}
          width={120}
        />
      </div>

      <div className="mt-3 flex items-center justify-start gap-2">
        <GiMoneyStack className="text-mainBrand h-6 w-6" />
        <p className="text-mainText text-justify text-sm">
          {t("referralBoxDescription1")}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-start gap-2">
        <FaPeopleArrows className="text-mainBrand h-6 w-6" />
        <p className="text-mainText text-justify text-sm">
          {t("referralBoxDescription2")}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-start gap-2">
        <FaPeopleGroup className="text-mainBrand h-6 w-6" />
        <p className="text-mainText text-justify text-sm">
          {t("referralBoxDescription3")}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-start gap-2">
        <FiShieldOff className="text-mainBrand h-6 w-6" />
        <p className="text-mainText text-justify text-sm">
          {t("referralBoxDescription4")}
        </p>
      </div>
      <CustomButton
        className="mt-4 flex h-8 items-center justify-center gap-2"
        variant="outline"
      >
        <Image
          src={"/assets/images/helpBulb.png"}
          alt="new_ref"
          width={20}
          height={20}
        />
        {t("help")}
      </CustomButton>
    </div>
  );
}

export default ReferralBanner;
