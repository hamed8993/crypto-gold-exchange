import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import Link from "next/link";

function FooterLinks() {
  const t = useTranslations();
  const { locale } = useUrl();

  const linksList = [
    {
      groupHead: t("about"),
      links: [
        {
          title: t("terms"),
          href: `/${locale}/${RoutesName.terms}`,
        },
        {
          title: t("disclaimer"),
          href: `/${locale}/${RoutesName.disclaimer}`,
        },
        {
          title: t("help"),
          href: `/${locale}/${RoutesName.help}`,
        },
        {
          title: t("riskDisclosure"),
          href: `/${locale}/${RoutesName.riskDisclosure}`,
        },
      ],
    },
    {
      groupHead: t("security"),
      links: [
        {
          title: t("changePassword"),
          href: `/${locale}/${RoutesName.changeEmail}`,
        },
        {
          title: t("privacyPolicy"),
          href: "#",
        },
        {
          title: t("identifyingDevices"),
          href: `/${locale}/${RoutesName.lastLogins}`,
        },
        {
          title: t("tfa"),
          href: `/${locale}/${RoutesName.tfa}`,
        },
        {
          title: t("cookiePolicy"),
          href: `/${locale}/${RoutesName.terms}`,
        },
      ],
    },
    {
      groupHead: t("transaction"),
      links: [
        {
          title: t("deposit"),
          href: `/${locale}/${RoutesName.deposit}`,
        },
        {
          title: t("withdraw"),
          href: `/${locale}/${RoutesName.withdraw}`,
        },
        {
          title: t("withdrawAndDepositHistory"),
          href: `/${locale}/${RoutesName.transactionsHistory}`,
        },
      ],
    },
    {
      groupHead: t("trade"),
      links: [
        {
          title: t("trade"),
          href: `/${locale}/${RoutesName.trade}`,
        },
        {
          title: t("tradesHistory"),
          href: `/${locale}/${RoutesName.tradesHistory}`,
        },
        {
          title: t("tradeRules"),
          href: `/${locale}/${RoutesName.tradeRules}`,
        },
      ],
    },
  ];

  return (
    <div className="grid w-full grid-cols-4">
      {linksList?.map((linkGroup) => (
        <div className="flex flex-col gap-8" key={linkGroup?.groupHead}>
          <div className="flex flex-col items-start gap-2">
            <span className="text-textPrimary text-sm font-normal">
              {linkGroup?.groupHead}
            </span>
            <span className="bg-newColor_textPrimary50 h-[3px] w-6 rounded-[140px]" />
          </div>

          <ul className="flex flex-col gap-4">
            {linkGroup?.links?.map((linkItem) => (
              <li
                className="text-textPrimary text-sm font-normal"
                key={linkItem?.title}
              >
                <Link href={linkItem?.href}>{linkItem?.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default FooterLinks;
