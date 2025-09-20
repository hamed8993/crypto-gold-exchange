import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface CustomResendProps {
  isOkToStart?: boolean;
  onResend?: () => void;
  setIsOkToStart?: Dispatch<SetStateAction<boolean>>;
}

function CustomResend({
  isOkToStart,
  onResend,
  setIsOkToStart,
}: CustomResendProps) {
  const t = useTranslations();

  const [timeLeft, setTimeLeft] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedTime = localStorage.getItem("time_saved");
    if (savedTime) {
      const elapsedTime = Math.floor((Date.now() - parseInt(savedTime)) / 1000);
      const remaining = 60 - elapsedTime;
      if (remaining > 0) {
        setTimeLeft(remaining);
        startCountdown(remaining);
      }
    }
    return () => clearInterval(intervalRef.current!);
  }, []);

  const startCountdown = (seconds: number) => {
    setTimeLeft(seconds);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = () => {
    onResend?.();
  };

  useEffect(() => {
    if (isOkToStart) {
      localStorage.setItem("time_saved", Date.now().toString());
      startCountdown(60);
      setIsOkToStart?.(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOkToStart]);

  return (
    <div className="flex flex-col items-end space-y-3">
      <AnimatePresence mode="wait">
        {timeLeft > 0 ? (
          <div className="flex items-center justify-start">
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="-mx-2 px-4 text-sm text-accentText dark:text-accentTextDark"
              exit={{ opacity: 0, y: 10 }}
              initial={{ opacity: 0, y: -10 }}
              key="countdown"
            >
              {t("seconds", { timeLeft })}
            </motion.p>
            <motion.button
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center rounded-[5px] bg-buttonPositive/50 px-3 py-2 dark:bg-buttonPositiveDark/50"
              disabled
              exit={{ opacity: 0, scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.9 }}
              key="button"
              type="button"
            >
              <p className="text-xs text-white">{t("resend")}</p>
            </motion.button>
          </div>
        ) : (
          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center rounded-[5px] bg-buttonPositive px-3 py-2 dark:bg-buttonPositiveDark"
            exit={{ opacity: 0, scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.9 }}
            key="button"
            onClick={handleResend}
            type="button"
          >
            <p className="text-xs text-white">{t("sendCode")}</p>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CustomResend;
