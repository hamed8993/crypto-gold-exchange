import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { RxCross2 } from "react-icons/rx";
import NotifiedBell from "../../notifiedBell";

interface HeadSectionProps {
  setIsOpenResponsiveSidebar: Dispatch<SetStateAction<boolean>>;
  containerClassName?: string;
}

function HeadSection({
  setIsOpenResponsiveSidebar,
  containerClassName,
}: HeadSectionProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        "flex w-full items-center justify-between",
        containerClassName,
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          alt={t("logo")}
          src={"/assets/images/logo.png"}
          width={45}
          height={45}
        />
        <p className="text-textPrimary size-12 text-4xl font-semibold">
          {t("goldfino")}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <NotifiedBell hasNotification={false} />
        <button type="button" onClick={() => setIsOpenResponsiveSidebar(false)}>
          <RxCross2 className="text-textPrimary text-4xl" />
        </button>
      </div>
    </div>
  );
}

export default HeadSection;
