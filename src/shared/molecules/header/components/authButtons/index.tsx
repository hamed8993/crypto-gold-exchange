import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import ButtonDefault from "@/shared/atoms/buttonDefault";
import { useTranslations } from "next-intl";

function AuthButtons() {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { locale } = useUrl();

  return (
    <>
      {!isLoggedIn && (
        <>
          <ButtonDefault
            href={`/${locale}/authentication/login`}
            size="lg"
            variant="outline"
          >
            {t("login")}
          </ButtonDefault>
          <ButtonDefault href={`/${locale}/authentication/register`} size="lg">
            {t("register")}
          </ButtonDefault>
        </>
      )}
    </>
  );
}

export default AuthButtons;
