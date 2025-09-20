"use client";

import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface PWACustomCollapseProps {
  children: ReactNode;
  topSection: ReactNode;
  isDefaultOpen?: boolean;
  topSectionClassName?: string;
  wrapperClassName?: string;
  chevronClassName?: string;
  passIsOpen?: (value: boolean) => void;
  childrenClassName?: string;
}

function CustomCollapse({
  children,
  isDefaultOpen = false,
  topSection,
  wrapperClassName,
  topSectionClassName,
  chevronClassName,
  passIsOpen,
  childrenClassName,
}: PWACustomCollapseProps) {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    passIsOpen?.(isOpen);
  }, [isOpen]);

  return (
    <div
      className={clsx(
        "mt-2 flex w-full cursor-pointer flex-col items-center justify-start rounded-lg border border-accentText50 p-2 dark:border-accentTextDark50",
        isOpen ? "gap-6" : "",
        wrapperClassName,
      )}
      style={{ overflow: isOpen ? "visible" : "hidden" }}
    >
      {/* topSection and chevron  */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          "flex w-full items-center justify-between",
          topSectionClassName,
        )}
      >
        {topSection}
        <div
          className={clsx("flex h-12 flex-col items-end justify-center py-1")}
        >
          {!isOpen ? (
            <FaChevronDown
              className={clsx(
                "h-3 w-3 text-accentText dark:text-accentTextDark",
                chevronClassName,
              )}
            />
          ) : (
            <FaChevronUp
              className={clsx(
                "h-3 w-3 text-accentText dark:text-accentTextDark",
                chevronClassName,
              )}
            />
          )}
        </div>
      </div>
      {/* CHILDREN   */}
      <div
        className={clsx(
          "flex max-h-fit w-full flex-col items-center justify-start",
          childrenClassName,
        )}
        style={{
          height: isOpen ? `${contentRef?.current?.scrollHeight}px` : "0px",
          overflow: isOpen ? "visible" : "hidden",
          transition: "height 0.3s ease",
        }}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
}

export default CustomCollapse;
