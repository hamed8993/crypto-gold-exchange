import { useTranslations } from "next-intl";
import { useNotification } from "@/core/providers/notificationProvider";

const useClipboard = () => {
  const t = useTranslations();
  const { showSuccess } = useNotification();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccess(t("copiedSuccessfully"));
    } catch (err) {
      return;
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (err) {
      return;
    }
  };

  return { copyToClipboard, pasteFromClipboard };
};

export default useClipboard;
