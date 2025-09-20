/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomButton from "@/components/atoms/customButton";
import LoadingView from "@/components/atoms/loadingView";
import { StickyComponent } from "@/components/atoms/stickyComponent";
import { useAuth } from "@/core/providers/authProvider";
import {
  useDeleteUser_dataDelete_active_sessions,
  useGetUser_dataActive_sessions,
} from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import DeviceRow from "../deviceRow";

function ManageDevicesTabs() {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();

  const {
    data: dataActiveSessions,
    isLoading: isLoadingActiveSessions,
    refetch: refetchActiveSessions,
  } = useGetUser_dataActive_sessions({ enabled: isLoggedIn });
  const activeSessions = dataActiveSessions?.result;

  const { mutate, isPending } = useDeleteUser_dataDelete_active_sessions({
    onSuccess: () => {
      refetchActiveSessions();
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

  return (
    <div className="flex w-full flex-1 flex-col justify-between">
      <div className="flex w-full flex-col items-start gap-2 pb-10">
        {isLoadingActiveSessions || activeSessions?.sessions?.length === 0 ? (
          <div className="flex w-full flex-1 items-center justify-center">
            <LoadingView />
          </div>
        ) : (
          // @ts-ignore
          activeSessions?.map((item) => (
            <DeviceRow
              currentSession={activeSessions.current}
              data={item}
              key={item.uuid}
              refetch={refetchActiveSessions}
            />
          ))
        )}
      </div>
      <StickyComponent className="bg-surface flex w-full items-center justify-center self-center px-3 py-2">
        <CustomButton
          className="bg-negative mb-2 w-full rounded-md text-sm"
          isLoading={isPending}
          onClick={onRemoveAll}
        >
          {t("logoutAllDevices")}
        </CustomButton>
      </StickyComponent>
    </div>
  );
}

export default ManageDevicesTabs;
