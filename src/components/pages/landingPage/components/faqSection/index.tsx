import clsx from "clsx";
import FaqAccordion from "./components/faqAccordion";
import HighLightFaq from "./components/highLightFaq";
import SupportBox from "./components/supportBox";

interface FaqSectionProps {
  containerClassName?: string;
}

function FaqSection({ containerClassName }: FaqSectionProps) {
  return (
    <div
      className={clsx(
        "block w-full overflow-hidden px-0 lg:flex",
        containerClassName,
      )}
    >
      <span className="bg-newColor_borderNeutral10 mt-[440px] hidden h-[1px] w-full lg:block lg:min-w-[109px] 2xl:min-w-[143px]" />
      <div className="mx-auto flex w-full flex-col gap-5 lg:w-[1154px] lg:min-w-[1154px] lg:flex-row">
        <div className="2xl-w-[449px] flex w-full flex-col items-start gap-[43px] lg:w-[393px]">
          <HighLightFaq containerClassName="ltr:pl-6 rtl:pr-6" />
          <div className="hidden items-center justify-center lg:flex">
            <SupportBox />
          </div>
        </div>
        <FaqAccordion containerClassName="lg:px-0 px-16 lg:mt-[94px] mt-[38px] lg:w-[393px] 2xl:w-[684px]" />
      </div>
      <span className="hidden h-px w-full bg-transparent lg:block" />

      <div className="mt-6 flex items-center lg:hidden">
        <span className="bg-newColor_borderNeutral10 inline-block h-px w-full max-w-16 min-w-16" />
        <SupportBox />
        <span className="bg-newColor_borderNeutral10 inline-block h-px w-full max-w-16 min-w-16" />
      </div>
    </div>
  );
}

export default FaqSection;
