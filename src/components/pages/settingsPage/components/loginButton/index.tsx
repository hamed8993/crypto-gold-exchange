"use client";

import { useTranslations } from "next-intl";
import { RoutesName } from "@/core/constants/routes";
import ButtonLink from "@/components/atoms/buttonLink";
import { useAuth } from "@/core/providers/authProvider";

function LoginButton() {
  const t = useTranslations();

  const { isLoggedIn } = useAuth();

  return (
    !isLoggedIn && (
      <ButtonLink
        className="mb-2 flex h-10 items-center justify-center"
        href={RoutesName.login}
      >
        {t("loginRegister")}
      </ButtonLink>
    )
  );
}

export default LoginButton;
