import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import CardItem from "./components/cardItem";
import HighlightSectionWhyGoldFino from "./components/highlightSectionWhyGoldFino";

interface WhyGoldFinoSectionProps {
  containerClassName?: string;
}

function WhyGoldFinoSection({ containerClassName }: WhyGoldFinoSectionProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        "bg-newColor_bgNavy100 bg-line-pattern-dark flex flex-col items-center justify-center gap-[46px] bg-repeat py-[96px]",
        containerClassName,
      )}
    >
      <HighlightSectionWhyGoldFino className="w-full bg-transparent px-6 lg:w-[88%] lg:px-0 2xl:w-1/2" />
      <div className="flex w-fit flex-col-reverse gap-9 lg:flex-row lg:gap-6 2xl:gap-16">
        <CardItem
          title={t("whyGoldfinoCardItem1Title")}
          subTitle={t("whyGoldfinoCardItem1SubTitle")}
          text={t("whyGoldfinoCardItem1Text")}
          imageSection={
            <>
              <Image
                className="absolute bottom-[94px] h-[113px] w-[162px] rounded-xl ltr:right-[50px] ltr:scale-x-[-1] ltr:transform rtl:left-[50px]"
                height={113}
                width={162}
                alt={t("whyGoldfinoCard1Img1")}
                src="/assets/images/landing/coins-blur.svg"
              />

              <Image
                className="absolute bottom-0 h-[142px] w-[138px] ltr:right-[5px] ltr:scale-x-[-1] ltr:transform rtl:left-[5px]"
                height={138}
                width={142}
                alt={t("whyGoldfinoCard1Img2")}
                src="/assets/images/landing/coin-BTC.svg"
              />
              <Image
                className="absolute -bottom-[70px] h-[227px] w-[220px] ltr:-left-[40px] ltr:scale-x-[-1] ltr:transform rtl:-right-[40px]"
                height={227}
                width={220}
                alt={t("whyGoldfinoCard1Img3")}
                src="/assets/images/landing/dollar.svg"
              />
            </>
          }
        />

        <CardItem
          title={
            <span className="flex items-center gap-1">
              {t("whyGoldfinoCardItem2Title1")}
              <span className="font-english">
                {t("whyGoldfinoCardItem2Title2")}
              </span>
              {t("whyGoldfinoCardItem2Title3")}
            </span>
          }
          subTitle={t("whyGoldfinoCardItem2SubTitle")}
          text={t("whyGoldfinoCardItem2Text")}
          imageSection={
            <>
              <Image
                className="absolute bottom-0 w-[303px] rounded-xl lg:h-[214px] ltr:left-0 ltr:scale-x-[-1] ltr:transform rtl:right-0"
                height={214}
                width={303}
                alt={t("whyGoldfinoCard2Img1")}
                src="/assets/images/landing/robots-computer.svg"
              />
              <Image
                className="absolute bottom-0 h-[208px] w-[208px] lg:h-[174px] lg:w-[174px] ltr:-right-10 ltr:scale-x-[-1] ltr:transform rtl:-left-10"
                height={174}
                width={174}
                alt={t("whyGoldfinoCard2Img2")}
                src="/assets/images/landing/robot-head.svg"
              />
            </>
          }
        />

        <CardItem
          title={t("whyGoldfinoCardItem3Title")}
          subTitle={t("whyGoldfinoCardItem3SubTitle")}
          text={t("whyGoldfinoCardItem3Text")}
          imageSection={
            <>
              <Image
                className="absolute bottom-0 h-[280px] w-[397px] rounded-xl ltr:left-0 ltr:scale-x-[-1] ltr:transform rtl:right-0"
                height={218}
                width={307}
                alt={t("whyGoldfinoCard3Img1")}
                src="/assets/images/landing/calculator.svg"
              />
              <Image
                className="absolute top-0 h-[275px] w-[161px] lg:h-[117px] lg:w-[181px] 2xl:h-[275px] 2xl:w-[152px] ltr:right-[-85px] ltr:scale-x-[-1] ltr:transform rtl:left-[-85px]"
                height={275}
                width={161}
                alt={t("whyGoldfinoCard3Img2")}
                src="/assets/images/landing/ticket.svg"
              />
            </>
          }
        />
      </div>
    </div>
  );
}

export default WhyGoldFinoSection;
