"use client";

import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { LuScanBarcode } from "react-icons/lu";

const socialIcons = [
  <FaFacebookF size={20} key="facebook" />,
  <FaXTwitter size={20} key="twitter" />,
  <FaYoutube size={20} key="youtube" />,
  <FaInstagram size={20} key="instagram" />,
  <FaLinkedinIn size={20} key="linkedin" />,
];

function Footer() {
  const t = useTranslations();
  const { locale } = useUrl();

  const footerLinks = [
    {
      heading: t("aboutUs"),
      links: [
        {
          label: t("terms"),
          href: `/${locale}/${RoutesName.terms}`,
        },
        {
          label: t("disclaimer"),
          href: `/${locale}/${RoutesName.disclaimer}`,
        },
        {
          label: t("help"),
          href: `/${locale}/${RoutesName.help}`,
        },
        {
          label: t("riskDisclosure"),
          href: `/${locale}/${RoutesName.riskDisclosure}`,
        },
      ],
    },
    {
      heading: t("security"),
      links: [
        {
          label: t("changeEmail"),
          href: `/${locale}/${RoutesName.changeEmail}`,
        },
        {
          label: t("manageDevices"),
          href: `/${locale}/${RoutesName.lastLogins}`,
        },
        {
          label: t("tfa"),
          href: `/${locale}/${RoutesName.tfa}`,
        },
      ],
    },
    {
      heading: t("transaction"),
      links: [
        {
          label: t("deposit"),
          href: `/${locale}/${RoutesName.deposit}`,
        },
        {
          label: t("withdraw"),
          href: `/${locale}/${RoutesName.withdraw}`,
        },
        {
          label: t("withdrawAndDepositHistory"),
          href: `/${locale}/${RoutesName.transactionsHistory}`,
        },
      ],
    },
    {
      heading: t("trade"),
      links: [
        {
          label: t("trade"),
          href: `/${locale}/${RoutesName.trade}`,
        },
        {
          label: t("tradesHistory"),
          href: `/${locale}/${RoutesName.tradesHistory}`,
        },
        {
          label: t("tradeRules"),
          href: `/${locale}/${RoutesName.tradeRules}`,
        },
      ],
    },
  ];
  return (
    <footer className="bg-secondBackground px-6 py-10 text-sm text-mainText dark:bg-secondBackgroundDarkTest dark:text-mainTextDark">
      <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col gap-5 divide-y divide-border dark:divide-borderDark">
        {/* title */}
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <h2 className="text-[26px] font-semibold">{t("feelConnected")}</h2>
          <div className="flex items-center gap-4">
            {socialIcons.map((icon, i) => (
              <div
                key={i}
                className="rounded-md border border-accentText50 p-2 text-lg *:text-accentText dark:border-accentTextDark50 dark:border-borderDark dark:*:text-accentTextDark"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
        {/* links */}

        <div className="hidden grid-cols-4 gap-6 pt-5 md:grid">
          {footerLinks.map((section) => (
            <div key={section.heading}>
              <h3 className="mb-3 text-sm font-bold text-gray-500">
                {section.heading}
              </h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.label} className="mb-2 cursor-pointer">
                    <a
                      href={link.href}
                      className="font-semibold text-mainText hover:text-blue-500 dark:text-mainTextDark"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* appSec */}
        <div className="flex items-center justify-center gap-4 pt-5 md:justify-end">
          <button className="flex items-center text-mainText">
            <Image
              alt="google play"
              src={"/assets/images/app-store.svg"}
              width={140}
              height={40}
            />
          </button>
          <button className="flex items-center text-mainText">
            <Image
              alt="app store"
              src={"/assets/images/google-play.svg"}
              width={140}
              height={40}
            />
          </button>
          <div className="rounded-lg border-2 border-[#97a3aa] p-1 dark:border-borderDark">
            <LuScanBarcode size={30} className="text-[#97a3aa]" />
          </div>
        </div>

        {/* text content */}
        <div className="pt-5 text-xs text-gray-600">
          <div className="mb-4 flex flex-col justify-between gap-3 xl:flex-row">
            <div className="flex flex-col gap-4 md:flex-row">
              <a
                href="#"
                className="font-semibold text-blue-500 hover:text-blue-600"
              >
                {t("privacyPolicy")}
              </a>
              <a
                href="#"
                className="font-semibold text-blue-500 hover:text-blue-600"
              >
                {t("cookiePolicy")}
              </a>
              <a
                href="#"
                className="font-semibold text-blue-500 hover:text-blue-600"
              >
                {t("termsConditions")}
              </a>
              <a
                href="#"
                className="font-semibold text-blue-500 hover:text-blue-600"
              >
                {t("riskDisclosure")}
              </a>
            </div>
            <p className="text-accentText dark:text-accentTextDark">
              {t("copyright")}
            </p>
          </div>
          <p className="mb-4 text-justify text-mainText dark:text-mainTextDark">
            {t("riskWarning2")}
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
