import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface DrawerPageInstantProps {
  children: ReactNode;
  hasCross?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

function DrawerPageInstant({
  children,
  hasCross = true,
  isOpen,
  onClose,
}: DrawerPageInstantProps) {
  return (
    isOpen && (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center"
        onClick={onClose}
      >
        <div
          className={
            "pointer-events-auto relative w-full max-w-(--breakpoint-sm) bg-mainBackground shadow-lg dark:bg-mainBackgroundDark"
          }
          onClick={(e) => e.stopPropagation()}
          style={{
            height: "100dvh",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
          }}
        >
          {hasCross && (
            <div
              className="flex min-h-14 w-full cursor-pointer items-center justify-end px-6"
              onClick={onClose}
            >
              <IoMdClose className="mt-2 h-6 w-6 text-mainText dark:text-mainTextDark" />
            </div>
          )}

          <div className={"h-[calc(100%-56px)] overflow-auto"}>{children}</div>
        </div>
      </div>
    )
  );
}

export default DrawerPageInstant;
