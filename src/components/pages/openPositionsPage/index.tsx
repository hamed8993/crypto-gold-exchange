"use client";

import PwaPageLayout from "@/components/organisms/layout";
import { useTranslations } from "next-intl";
import PositionsHistory from "./components/positionsHistory";

interface OpenPositionsPageProps {
  className?: string;
}

const OpenPositionsPage = ({ className }: OpenPositionsPageProps) => {
  const t = useTranslations();

  return (
    <PwaPageLayout
      wrapperClassName={className}
      containerClassName="pr-0 pl-0"
      hasBackChevron
      title={t("openPositions")}
    >
      <div className="flex h-[calc(100vh-80px)]! w-full flex-col items-center justify-between">
        <div className="flex h-full w-full flex-col items-center justify-start">
          <PositionsHistory />
        </div>
      </div>
    </PwaPageLayout>
  );
};

export default OpenPositionsPage;
