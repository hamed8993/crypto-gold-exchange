import ButtonLink from "@/components/atoms/buttonLink";
import CustomDrawer from "@/components/atoms/customDrawer";
import { RoutesName } from "@/core/constants/routes";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const GoldBarsAnimation = dynamic(
  () => import("../animation/index").then((resolve) => resolve.default),
  {
    ssr: false,
  },
);

interface LoginRegisterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginRegisterDrawer({ isOpen, onClose }: LoginRegisterDrawerProps) {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <CustomDrawer isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full flex-col items-center justify-between">
        <div className="mt-24 flex flex-col items-center justify-center">
          <div className="flex min-h-56 min-w-56 items-center justify-center">
            <GoldBarsAnimation />
          </div>
          <p className="text-mainText">{t("welcome")}</p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-2 py-5">
          <ButtonLink
            className="py-4"
            href={RoutesName.login}
            onClick={pathname.includes(RoutesName.login) ? onClose : undefined}
          >
            {t("login")}
          </ButtonLink>
          <ButtonLink
            className="bg-surface !text-mainText py-4 leading-none"
            href={RoutesName.register}
            onClick={
              pathname.includes(RoutesName.register) ? onClose : undefined
            }
          >
            {t("register")}
          </ButtonLink>
        </div>
      </div>
    </CustomDrawer>
  );
}

export default LoginRegisterDrawer;
