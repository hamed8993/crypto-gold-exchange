import ButtonLink from "@/components/atoms/buttonLink";
import { RoutesName } from "@/core/constants/routes";
import { useSideDrawer } from "@/core/hooks/useSideDrawer";
import { useAuth } from "@/core/providers/authProvider";
import { useTranslations } from "next-intl";
import { IoMenu } from "react-icons/io5";

function Header() {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const { setIsSideMenuOpen } = useSideDrawer();

  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-14 w-full items-center justify-between overflow-visible bg-mainBackground px-4 dark:bg-mainBackgroundDark">
      <div className="flex items-center justify-start gap-4">
        <IoMenu
          onClick={() => setIsSideMenuOpen(true)}
          className="h-7 w-7 text-mainText dark:text-mainTextDark"
        />
        {/* <BsQuestionCircle
          onClick={() => {
            setIsDrawerOpen(true);
          }}
          className="h-6 w-6 text-mainText dark:text-mainTextDark"
        />
        <HelpDrawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        /> */}
      </div>
      <div className="flex min-h-[50px] items-center justify-start gap-2">
        {isLoggedIn ? (
          <ButtonLink
            className="flex min-w-16! items-center justify-center rounded-[5px] bg-buttonPositive px-1 py-2 dark:bg-buttonPositiveDark"
            href={`/${RoutesName.deposit}`}
          >
            <p className="text-xs text-white">{t("deposit")}</p>
          </ButtonLink>
        ) : (
          <ButtonLink
            className="flex min-w-16! items-center justify-center rounded-[5px] bg-buttonPositive px-1 py-2 dark:bg-buttonPositiveDark"
            href={`/${RoutesName.login}`}
          >
            <p className="text-xs text-white">{t("login")}</p>
          </ButtonLink>
        )}
      </div>
    </div>
  );
}

export default Header;
