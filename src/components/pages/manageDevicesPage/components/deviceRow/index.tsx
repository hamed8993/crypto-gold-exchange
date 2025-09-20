import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { RequestError } from "@/core/services/config";
import { useDeleteUser_dataDelete_active_sessions } from "@/core/services/hooks";
import { GetUserDataActiveSessions } from "@/core/services/types";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosLaptop } from "react-icons/io";

interface DeviceRowProps {
  currentSession?: string;
  data?: {
    agent: string;
    uuid: string;
  };
  refetch: (
    options?: RefetchOptions,
  ) => Promise<
    QueryObserverResult<GetUserDataActiveSessions, RequestError | Error>
  >;
}

function DeviceRow({ currentSession, data, refetch }: DeviceRowProps) {
  const { showError, showSuccess } = useNotification();
  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const { mutate } = useDeleteUser_dataDelete_active_sessions({
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data.result));
      refetch();
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showError(getErrorMessages(error.message, error));
    },
  });

  const onRemove = (uuid: string) => {
    mutate({
      queryParams: {
        uuid: uuid,
      },
    });
  };

  return (
    <div className="flex w-full items-center justify-between p-2">
      <div
        className="flex h-10 w-10 cursor-pointer items-center justify-center"
        onClick={() => {
          if (data?.uuid === currentSession) return;
          onRemove(data?.uuid || "");
        }}
      >
        {data?.uuid !== currentSession && (
          <FaRegTrashAlt className="text-negative h-5 w-5" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <p className="text-mainText text-sm">{data?.agent}</p>
        <div className="bg-accentText50 flex h-fit rounded-full p-2">
          <IoIosLaptop className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}

export default DeviceRow;
