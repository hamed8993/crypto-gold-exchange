import Footer from "@/components/molecules/footer";
import SideMenu from "@/components/molecules/SideMenu";
import Header from "@/shared/molecules/header";
import clsx from "clsx";
import { ReactNode } from "react";

interface DesktopDepositPageProps {
  children: ReactNode;
  className?: string;
  hasHeader?: boolean;
  hasFooter?: boolean;
  hasSideMenu?: boolean;
  hasHeaderBg?: boolean;
}
export function DesktopPageLayout({
  children,
  className,
  hasFooter = true,
  hasHeader = true,
  hasSideMenu = false,
}: DesktopDepositPageProps) {
  return (
    <div
      className={clsx("hidden h-full w-screen bg-bgDefault pt-9", className)}
    >
      {hasHeader && <Header />}

      <div className="relative flex">
        {hasSideMenu && <SideMenu />}
        <div className={clsx("w-full", hasSideMenu ? "p-4" : "")}>
          {children}
        </div>
      </div>
      {hasFooter && <Footer />}
    </div>
  );
}
