import { ReactNode } from "react";
import CustomDrawer from "../customDrawer";
import clsx from "clsx";

interface DrawerPageProps {
  isOpen: boolean;
  hasCross?: boolean;
  children: ReactNode;
  onClose: () => void;
  drawerClassName?: string;
}

const DrawerPage = ({
  children,
  isOpen,
  drawerClassName,
  onClose,
  hasCross,
  ...rest
}: DrawerPageProps) => {
  return (
    <CustomDrawer
      hasCross={hasCross}
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
    >
      <div
        className={clsx(
          "flex h-full w-full flex-col items-center justify-start bg-mainBackground px-4 dark:bg-mainBackgroundDark",
          drawerClassName,
        )}
      >
        {children}
      </div>
    </CustomDrawer>
  );
};

export { DrawerPage };
