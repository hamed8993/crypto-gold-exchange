"use client";

import HorizontalGradientLine from "@/components/atoms/horizontalGradientLine";
import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";
import WithdrawForm from "./components/withdrawForm";
import WithdrawInfoModal from "./components/withdrawInfoModal";
import { DesktopWithdrawContextProvider } from "./provider";
interface DesktopWithdrawPageProps {
  className?: string;
}

function Component({ className }: DesktopWithdrawPageProps) {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fragment>
      <DesktopPageLayout hasHeader hasSideMenu hasFooter className={className}>
        <div className="flex min-h-screen w-full flex-col px-4 py-3">
          <p className="text-mainText text-2xl">{t("withdraw")}</p>
          <HorizontalGradientLine className="to-accentText mt-2! mb-5! from-transparent!" />
          <WithdrawForm setIsModalOpen={setIsModalOpen} />
        </div>
      </DesktopPageLayout>
      {isModalOpen && (
        <WithdrawInfoModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </Fragment>
  );
}

const DesktopWithdrawPage = ({ ...rest }: DesktopWithdrawPageProps) => {
  return (
    <DesktopWithdrawContextProvider>
      <Component {...rest} />
    </DesktopWithdrawContextProvider>
  );
};
export default DesktopWithdrawPage;
