import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

interface CustomDropdownProps {
  wrapperClassName?: string;
  toggler?: ReactNode;
  className?: string;
  children: ReactNode;
  togglerClassName?: string;
  setIsSelectOpen?: (isVisible: boolean) => void;
}

const CustomDropdown = ({
  wrapperClassName,
  className,
  children,
  toggler,
  togglerClassName,
  setIsSelectOpen,
}: CustomDropdownProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsSelectOpen?.(isVisible);
  }, [isVisible]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        parentRef.current &&
        !parentRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [parentRef]);

  return (
    <div
      onClick={() => setIsVisible((prev) => !prev)}
      className={clsx("relative", wrapperClassName)}
    >
      <div
        className={clsx(
          "flex cursor-pointer items-center justify-center gap-2 px-2 py-1",
          togglerClassName,
        )}
      >
        {toggler}
      </div>
      <div
        ref={parentRef}
        onClick={(event) => event.stopPropagation()}
        className={clsx(
          "absolute bottom-0 start-0 w-fit translate-y-full animate-fadeIn items-center justify-center shadow-lg",
          isVisible ? "z-10 flex" : "hidden",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomDropdown;
