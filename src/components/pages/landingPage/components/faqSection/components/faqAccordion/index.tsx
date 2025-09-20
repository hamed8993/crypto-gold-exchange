"use client";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CollapseItem from "../collapseItem";

interface FaqAccordionProps {
  containerClassName?: string;
}
type AccordionItemTYpe = {
  id: number | string;
  title: string;
  text: string;
};

function FaqAccordion({ containerClassName }: FaqAccordionProps) {
  const t = useTranslations();

  const accordionsList: AccordionItemTYpe[] = [
    {
      id: 1,
      title: t("faqAccordion1Title"),
      text: t("faqAccordion1Text"),
    },
    {
      id: 2,
      title: t("faqAccordion2Title"),
      text: t("faqAccordion2Text"),
    },
    {
      id: 3,
      title: t("faqAccordion3Title"),
      text: t("faqAccordion3Text"),
    },
    {
      id: 4,
      title: t("faqAccordion4Title"),
      text: t("faqAccordion4Text"),
    },
  ];

  const [isOpen, setIsOpen] = useState<string | number>(0);

  return (
    <div className={clsx("flex flex-col gap-5", containerClassName)}>
      {accordionsList?.map((item: AccordionItemTYpe) => (
        <CollapseItem
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          key={item?.id}
          itemKey={item?.id}
          wrapperClassName="mt-0! w-full h-fit rounded-xl border border-newColor_borderNeutral10 px-6 py-5 "
          topSectionClassName="h-[22px]!"
          chevronClassName="size-6"
          childrenClassName="items-start!"
          topSection={
            <p className="text-textPrimary text-[16px] font-normal">
              {item?.title}
            </p>
          }
        >
          <p className="text-textSecondary text-sm font-normal">{item?.text}</p>
        </CollapseItem>
      ))}
    </div>
  );
}

export default FaqAccordion;
