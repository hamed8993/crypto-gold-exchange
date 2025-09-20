import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaTelegramPlane } from "react-icons/fa";
import { FaDiscord, FaTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { SiClubhouse } from "react-icons/si";

function FooterCopyrightAndSocial() {
  const t = useTranslations();

  const socialsList = [
    {
      name: "instagram",
      icon: (
        <RiInstagramFill className="text-newColor_bgPrimary50 text-[24px]" />
      ),
      href: "#",
    },
    {
      name: "twitter",
      icon: <FaTwitter className="text-newColor_bgPrimary50 text-[24px]" />,
      href: "#",
    },
    {
      name: "clubHouse",
      icon: <SiClubhouse className="text-newColor_bgPrimary50 text-[24px]" />,
      href: "#",
    },
    {
      name: "telegram",
      icon: (
        <FaTelegramPlane className="text-newColor_bgPrimary50 text-[24px]" />
      ),
      href: "#",
    },
    {
      name: "discord",
      icon: <FaDiscord className="text-newColor_bgPrimary50 text-[24px]" />,
      href: "#",
    },
  ];

  return (
    <div className="flex justify-between">
      <p className="text-newColor_bgPrimary50 text-[16px] font-normal">
        {t("footerCopyright")}
      </p>
      <div className="flex flex-row-reverse gap-4">
        {socialsList?.map((item) => (
          <Link key={item?.name} href={item?.href}>
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FooterCopyrightAndSocial;
