import CustomDropzone from "@/components/atoms/customDropzone";
import CustomInput from "@/components/atoms/customInput";
import { useGetAPIMessages } from "@/core/providers/apiMessagesProvider";
import { useNotification } from "@/core/providers/notificationProvider";
import {
  useGetTicketsGet_ticket_data,
  usePostTicketsReply,
} from "@/core/services/hooks";
import Image from "next/image";
import { useState } from "react";
import { BiSend } from "react-icons/bi";
import { CgAttachment } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

interface UserInputBoxProps {
  ticket_number: number | string;
}

function UserInputBox({ ticket_number }: UserInputBoxProps) {
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const { showError } = useNotification();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { refetch } = useGetTicketsGet_ticket_data(ticket_number?.toString());

  const { getErrorMessages } = useGetAPIMessages();

  const handleRemoveImage = (file: string) => {
    setSelectedImages(selectedImages.filter((item) => item !== file));
  };

  const reset = () => {
    setMessage("");
    setSelectedImages([]);
  };

  const { mutate: reply } = usePostTicketsReply({
    onSuccess: () => {
      refetch();
      reset();
    },
    onError: (error) => {
      showError(getErrorMessages(error));
    },
  });

  const replyTicket = () => {
    const formData = new FormData();
    Array.from(selectedImages).forEach((file) => {
      formData.append("attachments[]", file);
    });
    formData.append("message", message);
    formData.append("ticketNumber", ticket_number?.toString());
    reply({
      requestBody: formData,
      configOverride: {
        headers: { "Content-Type": "" },
      },
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-start px-2">
      {selectedImages?.length > 0 ? (
        <div
          className={
            "border-accentText50 flex w-full flex-wrap items-center justify-start gap-2 overflow-x-auto rounded-xl border border-dashed p-3"
          }
        >
          {selectedImages.map((src, i) => {
            const imageUrl = URL.createObjectURL(src);
            return (
              <div key={i} className={"relative mx-2 h-8 w-8"}>
                <RxCross2
                  onClick={() => {
                    handleRemoveImage(src);
                  }}
                  className="text-negative absolute top-1 right-1 z-2 h-4 w-4"
                />
                <Image
                  alt={src}
                  onLoad={() => URL.revokeObjectURL(imageUrl)}
                  src={imageUrl}
                  width={80}
                  height={80}
                  className="h-8 w-8"
                />
              </div>
            );
          })}
        </div>
      ) : null}
      <div className="mt-2 flex min-h-12 w-full items-center justify-between gap-2 py-2">
        <CustomInput
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          className="border-accentText50 text-mainText h-10! min-h-10 w-full rounded-md border bg-transparent px-2"
          inputClassName="bg-transparent"
          placeholder="Type message ..."
        />
        <CustomDropzone
          maxFiles={5}
          onDrop={(file) =>
            selectedImages.length < 5 &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            setSelectedImages([
              ...selectedImages,
              ...file.slice(0, 5 - selectedImages?.length),
            ])
          }
        >
          <div className="bg-positive flex h-10! w-10! min-w-10 cursor-pointer items-center justify-center rounded-md">
            <CgAttachment className="text-xl text-white" />
          </div>
        </CustomDropzone>

        <div className="bg-mainBrand flex h-10! w-10! min-w-10 cursor-pointer items-center justify-center rounded-md">
          <BiSend onClick={replyTicket} className="text-xl text-white" />
        </div>
      </div>
    </div>
  );
}

export default UserInputBox;
