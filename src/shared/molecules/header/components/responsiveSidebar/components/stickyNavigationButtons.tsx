import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";
import { PiWallet } from "react-icons/pi";

interface StickyNavigationButtonsProps {
  containerClassName?: string;
}
function StickyNavigationButtons({
  containerClassName,
}: StickyNavigationButtonsProps) {
  const t = useTranslations();

  const { isLoggedIn } = useAuth();
  const { locale } = useUrl();

  return (
    <div className={containerClassName}>
      {!isLoggedIn ? (
        <div className="flex w-full flex-col gap-2 pb-2">
          <ButtonDefault
            href={`/${locale}/authentication/register`}
            className="!h-12 !w-full"
          >
            <span className="text-constantLight text-sm font-semibold">
              {t("register")}
            </span>
          </ButtonDefault>
          <ButtonDefault
            href={`/${locale}/authentication/login`}
            className="!bg-constantLight !h-12 !w-full"
            variant="outline"
          >
            <span className="text-textPrimary text-sm font-semibold">
              {t("login")}
            </span>
          </ButtonDefault>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-2 pb-2">
          <ButtonDefault
            href={`/${locale}/authentication/register`}
            className="!h-12 !w-full"
          >
            <span className="text-constantLight text-sm font-semibold">
              {t("navigateToDashboard")}
            </span>
          </ButtonDefault>
          <ButtonDefault
            href={`/${locale}/authentication/login`}
            className="!bg-constantLight !h-12 !w-full"
            variant="outline"
            icon={<PiWallet className="size-4" />}
          >
            <span className="text-textPrimary text-sm font-semibold">
              {t("portfolio")}
            </span>
          </ButtonDefault>
        </div>
      )}
    </div>
  );
}

export default StickyNavigationButtons;
