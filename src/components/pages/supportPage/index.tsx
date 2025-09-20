import PwaPageLayout from "@/components/organisms/layout";
import { useTranslations } from "next-intl";
import React from "react";
import ChatPage from "../chatPage";

function SupportPage() {
  const t = useTranslations();
  return (
    <PwaPageLayout hasFooter={false} hasBackChevron title={t("support")}>
      <ChatPage />
    </PwaPageLayout>
  );
}

export default SupportPage;
