import clsx from "clsx";
import { useTheme } from "next-themes";
import { BiError } from "react-icons/bi";
import { IoCheckmarkDone } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { createContext, useContext, useState, ReactNode } from "react";

interface Notification {
  id: number;
  message: string;
  type: "success" | "error";
}

interface NotificationContextProps {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | null>(
  null,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const addNotification = (type: "error" | "success", message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const showError = (message: string) => addNotification("error", message);
  const showSuccess = (message: string) => addNotification("success", message);

  return (
    <NotificationContext.Provider value={{ showSuccess, showError }}>
      <div
        className="flex h-fit w-fit max-w-56 flex-col gap-2"
        style={{
          position: "absolute",
          right: 8,
          top: "10%",
          zIndex: 51,
        }}
      >
        <AnimatePresence mode="wait">
          {notifications.map((notification) => {
            return (
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-4 py-2 text-white shadow-lg",
                )}
                exit={{ opacity: 0, x: 50 }}
                initial={{ opacity: 0, x: 50 }}
                key={notification.id}
                style={{
                  backgroundColor:
                    notification.type === "error"
                      ? "#e83946"
                      : theme === "dark"
                        ? "#0ecb81"
                        : "#0f8c6e",
                }}
              >
                {notification.type === "success" ? (
                  <IoCheckmarkDone className="h-5 w-5 text-white" />
                ) : (
                  <BiError className="h-5 w-5 text-white" />
                )}
                <span>{notification.message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};
