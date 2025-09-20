/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomButton from "@/components/atoms/customButton";
import LoadingView from "@/components/atoms/loadingView";
import Pagination from "@/components/molecules/pagination";
import useUrl from "@/core/hooks/useUrl";
import { useAuth } from "@/core/providers/authProvider";
import {
  useDeleteUser_dataDelete_active_sessions,
  useGetUser_dataActive_sessions,
} from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import DeviceRow from "../deviceRow";
import SureLogoutDeviceModal from "./components/sureLogoutDeviceModal";

function ManageDevicesTabs() {
  const t = useTranslations();
  const { locale } = useUrl();
  const { isLoggedIn } = useAuth();

  const [page, setPage] = useState<number>(1);

  const [isSureAllLogoutModalOpen, setIsSureAllLogoutModalOpen] =
    useState<boolean>(false);

  const {
    data: dataActiveSessions,
    isLoading: isLoadingActiveSessions,
    refetch: refetchActiveSessions,
  } = useGetUser_dataActive_sessions({ enabled: isLoggedIn });
  const activeSessions = dataActiveSessions?.result;

  const { mutate, isPending } = useDeleteUser_dataDelete_active_sessions({
    onSuccess: () => {
      refetchActiveSessions();
      setIsSureAllLogoutModalOpen(false);
    },
  });

  const onRemoveAll = () => {
    if (!activeSessions?.sessions || !activeSessions.current) return;

    activeSessions.sessions
      .filter((session) => session.uuid !== activeSessions.current)
      .forEach((session) => {
        mutate({
          queryParams: { uuid: session.uuid },
        });
      });
  };

  const maxRowsPerPage = 10;
  const lastPage = activeSessions?.sessions
    ? Math.ceil(activeSessions?.sessions.length / maxRowsPerPage)
    : 1;
  const paginatedList = activeSessions?.sessions?.slice(
    (page - 1) * maxRowsPerPage,
    page * maxRowsPerPage,
  );

  return (
    <div className="flex w-full flex-1 flex-col justify-between" dir="ltr">
      {isLoadingActiveSessions || activeSessions?.sessions?.length === 0 ? (
        <div className="flex w-full flex-1 items-center justify-center">
          <LoadingView />
        </div>
      ) : (
        <>
          {
            // @ts-ignore
            paginatedList.map((item) => (
              <DeviceRow
                currentSession={activeSessions?.current}
                data={item}
                key={item.uuid}
                refetch={refetchActiveSessions}
              />
            ))
          }
          <div className="relative flex" dir={locale === "en" ? "ltr" : "rtl"}>
            <Pagination
              lastPage={lastPage}
              page={page}
              setPage={(page) => {
                setPage(page);
              }}
            />
            <CustomButton
              className="absolute end-4 top-4 w-[160px]! rounded-md bg-negative text-sm"
              isLoading={isPending}
              isDisabled={isPending}
              onClick={() => setIsSureAllLogoutModalOpen(true)}
            >
              {t("logoutAllDevices")}
            </CustomButton>
          </div>
        </>
      )}

      {isSureAllLogoutModalOpen && (
        <SureLogoutDeviceModal
          isPendingApi={isPending}
          isModalOpen={isSureAllLogoutModalOpen}
          setIsModalOpen={setIsSureAllLogoutModalOpen}
          text={t("sureLogoutAllDevice")}
          operation={onRemoveAll}
        />
      )}
    </div>
  );
}

export default ManageDevicesTabs;
