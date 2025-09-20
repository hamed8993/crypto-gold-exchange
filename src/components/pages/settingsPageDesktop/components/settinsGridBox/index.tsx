import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { TbAuth2Fa, TbHistoryToggle } from "react-icons/tb";
import SettingsItem from "../settingsItem";

function SettingsGridBox() {
  const { locale } = useUrl();
  const t = useTranslations();

  const settins = [
    {
      icon: <MdOutlineEmail className="text-mainText" size={40} />,
      title: t("changeEmail"),
      description: t("changeEmailDesc"),
      href: `/${locale}/${RoutesName.changeEmail}`,
    },
    {
      icon: <MdOutlinePassword className="text-mainText" size={40} />,
      title: t("changePassword"),
      description: t("changePasswordDesc"),
      href: `/${locale}/${RoutesName.changePassword}`,
    },
    {
      icon: <TbAuth2Fa className="text-mainText" size={40} />,
      title: t("tfa"),
      description: t("tfaDesc"),
      href: `/${locale}/${RoutesName.tfa}`,
    },
    {
      icon: <TbHistoryToggle className="text-mainText" size={40} />,
      title: t("lastLogins"),
      description: t("lastLoginsDesc"),
      href: `/${locale}/${RoutesName.lastLogins}`,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid max-w-[1000px] grid-cols-1 grid-rows-4 gap-4 lg:grid-cols-2 lg:grid-rows-2">
        {settins?.map((item, index) => {
          return (
            <SettingsItem
              description={item?.description}
              href={item?.href}
              icon={item?.icon}
              title={item?.title}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SettingsGridBox;
