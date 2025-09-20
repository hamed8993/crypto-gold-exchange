import CustomTextArea from "@/components/atoms/customTextArea";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

interface MessageInputProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

const MessageInput = ({ message, setMessage }: MessageInputProps) => {
  const t = useTranslations();

  return (
    <div className="border-accentText50 relative mt-8 flex h-40 w-full items-center justify-between rounded-lg border">
      <div
        className={
          "bg-surface absolute -top-5 right-1 z-1 flex items-center justify-center px-5 py-2"
        }
      >
        <label className="text-mainText mx-2 text-xs">{t("description")}</label>
      </div>
      <CustomTextArea
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        wrapperClassName="mt-4 "
        placeholder={t("enterText")}
        maxLength={1000}
        rows={10}
        inputClassName="p-3 h-40  border-none resize-none"
      />
    </div>
  );
};

export default MessageInput;
