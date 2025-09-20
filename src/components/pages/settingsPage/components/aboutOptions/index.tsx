import RowLink from "@/components/atoms/rowLink";
import { useTranslations } from "next-intl";
import { MdOutlineDevices } from "react-icons/md";
// import { IoHandLeftOutline } from "react-icons/io5";
import { RoutesName } from "@/core/constants/routes";
// import { BiBookOpen, BiStation } from "react-icons/bi";
// import { HiOutlineBuildingLibrary } from "react-icons/hi2";

function AboutOptions() {
  const t = useTranslations();

  return (
    <div className="divide-y-border bg-surface mb-2 flex h-fit w-full flex-col divide-y rounded-lg">
      <RowLink
        href={RoutesName.lastLogins}
        icon={<MdOutlineDevices className="text-negative h-6 w-6" />}
        text={t("manageDevices")}
      />
    </div>
  );
}

export default AboutOptions;
