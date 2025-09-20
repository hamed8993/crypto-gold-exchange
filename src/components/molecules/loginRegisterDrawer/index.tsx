import ButtonLink from "@/components/atoms/buttonLink";
import CustomDrawer from "@/components/atoms/customDrawer";
import { RoutesName } from "@/core/constants/routes";
import useUrl from "@/core/hooks/useUrl";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { GoAlert } from "react-icons/go";
import { IoIosLogIn } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";

interface LoginRegisterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginRegisterDrawer({ isOpen, onClose }: LoginRegisterDrawerProps) {
  const t = useTranslations();
  const { locale } = useUrl();

  return (
    <CustomDrawer
      height="200px"
      isOpen={isOpen}
      onClose={onClose}
      hasCross={false}
    >
      <div className="flex h-full w-full flex-col items-center justify-between gap-3 pt-2 pb-9">
        <div className="h-1 w-1/3 bg-accentText dark:bg-accentTextDark rounded-full" />
        <div className="flex flex-col w-full gap-3">
          <div className="flex items-center justify-start gap-1 px-8">
            <GoAlert className="text-mainText dark:text-mainTextDark scale-[0.9]" />
            <p className="text-xs  text-center  text-accentText dark:text-accentTextDark">
              {t("createAccountDescription")}
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-start gap-2 px-8">
            <Link
              className="flex h-12 w-full gap-2 items-center justify-center rounded-md bg-mainBrand"
              href={`/${locale}/authentication/register`}
              prefetch
            >
              <IoPersonAddOutline className="text-white" />
              <p className="text-sm text-white">{t("createAccount")}</p>
            </Link>
            <ButtonLink
              className="flex h-12 w-full items-center justify-center rounded-md border border-mainBrand bg-transparent"
              href={RoutesName.login}
              onClick={onClose}
            >
              <p className="text-sm flex items-center gap-2 text-mainText dark:text-mainTextDark">
                <IoIosLogIn className="text-mainText dark:text-mainTextDark scale-125" />
                {t("login")}
              </p>
            </ButtonLink>
          </div>
        </div>
      </div>
    </CustomDrawer>
  );
}

export default LoginRegisterDrawer;
