import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import Link from "next/link";

function TopRightSection() {
  const t = useTranslations();
  const { locale } = useUrl();

  return (
    <div className="flex h-[176px] w-full items-center justify-start gap-2 px-20">
      <p className="text-mainText text-sm">{t("haveNoAccount")}</p>
      <Link href={`/${locale}/authentication/register`} prefetch>
        <p className="text-mainBrand cursor-pointer text-sm font-semibold">
          {t("registerJustNow")}
        </p>
      </Link>
    </div>
  );
}

export default TopRightSection;
