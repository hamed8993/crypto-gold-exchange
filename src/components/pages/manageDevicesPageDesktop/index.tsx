"use client";

import LoadingView from "@/components/atoms/loadingView";
import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataLast_logins } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Pagination from "../../molecules/pagination";
import LastLoginBox from "./components/lastLoginBox";
import ManageDevicesTabs from "./components/manageDevicesTab";
import Tab from "./components/tab";

interface ManageDevicesPageDesktopProps {
  className?: string;
}

function ManageDevicesPageDesktop({
  className,
}: ManageDevicesPageDesktopProps) {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();

  const [activeTab, setActiveTab] = useState<"logins" | "devices">("logins");
  const [page, setPage] = useState<number>(1);

  const { data: dataLastLogins, isLoading: isLoadingLastLogins } =
    useGetUser_dataLast_logins({ enabled: isLoggedIn });

  const lastLogins = dataLastLogins?.result;

  const maxRowsPerPage = 12;
  const lastPage = lastLogins
    ? Math.ceil(lastLogins.length / maxRowsPerPage)
    : 1;
  const paginatedList = lastLogins?.slice(
    (page - 1) * maxRowsPerPage,
    page * maxRowsPerPage,
  );

  return (
    <DesktopPageLayout hasFooter hasHeader hasSideMenu className={className}>
      <div className="flex flex-1 flex-col gap-4 px-3 pb-10 shadow-none">
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
        <div className="divide-accentText50 divide-y">
          {activeTab === "logins" ? (
            paginatedList?.length === 0 || isLoadingLastLogins ? (
              <LoadingView />
            ) : (
              <>
                {paginatedList?.map((item) => {
                  return <LastLoginBox data={item} key={item.time} />;
                })}
                <Pagination
                  lastPage={lastPage}
                  page={page}
                  setPage={(page) => {
                    setPage(page);
                  }}
                />
              </>
            )
          ) : (
            <ManageDevicesTabs />
          )}
        </div>
      </div>
    </DesktopPageLayout>
  );
}

export default ManageDevicesPageDesktop;
