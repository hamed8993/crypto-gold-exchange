"use client";

import LoadingView from "@/components/atoms/loadingView";
import PwaPageLayout from "@/components/organisms/layout";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataLast_logins } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LastLoginBox from "./components/lastLoginBox";
import ManageDevicesTabs from "./components/manageDevicesTab";
import Tab from "./components/tab";

interface ManageDevicesPageProps {
  className?: string;
}

function ManageDevicesPage({ className }: ManageDevicesPageProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();

  const [activeTab, setActiveTab] = useState<"logins" | "devices">("logins");

  const { data: dataLastLogins, isLoading: isLoadingLastLogins } =
    useGetUser_dataLast_logins({ enabled: isLoggedIn });

  const lastLogins = dataLastLogins?.result;

  return (
    <PwaPageLayout
      title={t("manageDevices")}
      hasFooter={false}
      hasBackChevron
      wrapperClassName={className}
    >
      <div className="bg-surface flex flex-1 flex-col gap-4 px-3 pb-10 shadow-none">
        <div className={"mb-6 flex gap-3"}>
          <Tab
            activeTab={activeTab}
            onClick={() => setActiveTab("logins")}
            title={t("lastLogins")}
            value={"logins"}
          />
          <Tab
            activeTab={activeTab}
            onClick={() => setActiveTab("devices")}
            title={t("manageDevices")}
            value={"devices"}
          />
        </div>
        {activeTab === "logins" ? (
          lastLogins?.length === 0 || isLoadingLastLogins ? (
            <LoadingView />
          ) : (
            lastLogins?.map((item) => {
              return <LastLoginBox data={item} key={item.time} />;
            })
          )
        ) : (
          <ManageDevicesTabs />
        )}
      </div>
    </PwaPageLayout>
  );
}

export default ManageDevicesPage;
