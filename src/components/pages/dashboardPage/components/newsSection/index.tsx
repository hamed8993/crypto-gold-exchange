import { localeType } from "@/app/[locale]/layout";
import { rtlLanguages } from "@/core/constants/constants";
import useUrl from "@/core/hooks/useUrl";
import { useGetNews } from "@/core/services/hooks";

function NewsSection() {
  const { data } = useGetNews();
  const { locale } = useUrl();
  const announcements = !rtlLanguages.includes(locale as localeType)
    ? data?.result?.en
    : data?.result?.fa || [];

  const combinedText = announcements
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    ?.map((item) => item?.title)
    .join(`${"      "} ${"      •••••••      "} ${"      "}`);

  return (
    <div className="mb-6 flex h-10 min-h-10 w-screen items-center overflow-hidden bg-surface dark:bg-surfaceDark">
      <div className="animate-scroll flex w-fit gap-5">
        <div className="flex w-fit items-center gap-[3px]">
          <span className="w-max text-[14px] text-mainText dark:text-mainTextDark">
            {combinedText}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NewsSection;
