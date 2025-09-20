import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { createContext, ReactNode, useContext, useState } from "react";

interface Notification {
  id: number;
  message: string;
  type: "success" | "error";
}

interface NotificationContextProps {
  showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | null>(
  null,
);

export const CopyNotificationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const addNotification = (type: "error" | "success", message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const showNotification = (message: string) =>
    addNotification("error", message);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <div
        className="flex h-fit w-full max-w-56 flex-col items-center justify-center gap-2"
        style={{
          position: "fixed",
          bottom: "10%",
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
                  backgroundColor: "#010002",
                }}
              >
                <Image
                  alt="logo"
                  src={"/assets/images/logo.png"}
                  width={20}
                  height={20}
                />
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

export const useCopyNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};
