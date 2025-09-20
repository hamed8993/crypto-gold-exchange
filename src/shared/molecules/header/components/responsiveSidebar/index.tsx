import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect } from "react";
import NavigationLinks from "../navigationLinks";
import SwitchLanguage from "../switchLanguage";
import SwitchTheme from "../switchTheme";
import HeadSection from "./components/headSection";
import StickyNavigationButtons from "./components/stickyNavigationButtons";

interface ResponsiveSidebarProps {
  isOpenResponsiveSidebar: boolean;
  setIsOpenResponsiveSidebar: Dispatch<SetStateAction<boolean>>;
}

function ResponsiveSidebar({
  isOpenResponsiveSidebar,
  setIsOpenResponsiveSidebar,
}: ResponsiveSidebarProps) {
  const t = useTranslations();

  useEffect(() => {
    if (isOpenResponsiveSidebar) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpenResponsiveSidebar]);

  return (
    <AnimatePresence>
      {isOpenResponsiveSidebar && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="bg-constantLight fixed top-0 right-0 z-10 flex h-full w-full flex-col overflow-y-auto px-4"
        >
          <div className="flex h-full w-full flex-col">
            <HeadSection
              setIsOpenResponsiveSidebar={setIsOpenResponsiveSidebar}
              containerClassName="sticky top-0 z-[10] !bg-constantLight  pt-[54px]"
            />

            <NavigationLinks
              containerClassName="mt-[37px] flex flex-col gap-8! h-fit!"
              listItemClassName="h-fit!"
              linkItemClassName="justify-start! text-base font-semibold"
            />
            <span className="bg-newColor_borderNeutral10 mt-[30px] inline-block h-[1px] w-full" />
            <div className="mb-[24px]">
              <div className="mt-[15px] flex h-10 items-center justify-between">
                <p className="text-textSecondary text-base font-semibold">
                  {t("language")}
                </p>
                <SwitchLanguage />
              </div>
              <div className="mt-8 flex h-10 items-center justify-between">
                <p className="text-textSecondary text-base font-semibold">
                  {t("siteTheme")}
                </p>
                <SwitchTheme hasScrolled={false} />
              </div>
            </div>
            <StickyNavigationButtons containerClassName="sticky bottom-0 z-[10]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ResponsiveSidebar;
