import CustomButton from "@/components/atoms/customButton";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import { useGetTickets, usePostTicketsCreate } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useState } from "react";
import Header from "./components/header";
import MessageInput from "./components/messageInput";
import TitleInput from "./components/titleInput";
import UploadDocument from "./components/uploadDocument";

interface NewTicketProps {
  setLeftBoxName: Dispatch<SetStateAction<"ticketChat" | "newChat" | "none">>;
}

function NewTicket({ setLeftBoxName }: NewTicketProps) {
  const t = useTranslations();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const { showError, showSuccess } = useNotification();
  const { refetch } = useGetTickets();

  const { getErrorMessages, getSuccessMessages } = useGetAPIMessages();

  const handleRemoveImage = (file: string) => {
    setSelectedImages(selectedImages.filter((item) => item !== file));
  };

  const reset = () => {
    setTitle("");
    setMessage("");
    setSelectedImages([]);
  };

  const { mutate, isPending } = usePostTicketsCreate({
    onSuccess: (data) => {
      showSuccess(getSuccessMessages(data?.result));
      refetch();
      reset();
    },
    onError: (error) => {
      showError(getErrorMessages(error));
    },
  });

  const sendTicket = () => {
    const formData = new FormData();
    Array.from(selectedImages).forEach((file) => {
      formData.append("attachments[]", file);
    });
    formData.append("title", title);
    formData.append("message", message);
    mutate({
      requestBody: formData,
      configOverride: {
        headers: { "Content-Type": "" },
      },
    });
  };

  const isDisabled = title === "" || message === "" || isPending;

  return (
    <div className="bg-surface flex h-full w-full flex-col items-center justify-between rounded-xl p-2">
      <div className="flex h-full w-full flex-col items-center justify-start gap-2 p-2">
        <Header setLeftBoxName={setLeftBoxName} />
        <TitleInput title={title} setTitle={setTitle} />
        <MessageInput message={message} setMessage={setMessage} />
        <UploadDocument
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          handleRemoveImage={(file) => {
            handleRemoveImage(file);
          }}
        />
      </div>
      <div className="flex w-full items-center justify-center p-2">
        <CustomButton
          onClick={sendTicket}
          isLoading={isPending}
          isDisabled={isDisabled}
          variant="primary"
        >
          <p className="text-sm text-white">{t("send")}</p>
        </CustomButton>
      </div>
    </div>
  );
}

export default NewTicket;
