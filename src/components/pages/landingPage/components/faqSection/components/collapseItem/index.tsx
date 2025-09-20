"use client";

import clsx from "clsx";
import { ReactNode, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface PWACollapseItemProps {
  children: ReactNode;
  topSection: ReactNode;
  isDefaultOpen?: boolean;
  topSectionClassName?: string;
  wrapperClassName?: string;
  chevronClassName?: string;
  childrenClassName?: string;
  isOpen: string | number;
  setIsOpen: (arg: string | number) => void;
  itemKey: string | number;
}

function CollapseItem({
  children,
  topSection,
  wrapperClassName,
  topSectionClassName,
  chevronClassName,
  childrenClassName,
  isOpen,
  setIsOpen,
  itemKey,
}: PWACollapseItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      onClick={() => setIsOpen(itemKey === isOpen ? 0 : itemKey)}
      className={clsx(
        "border-accentText50 mt-2 flex w-full cursor-pointer flex-col items-center justify-start rounded-lg border p-2",
        isOpen === itemKey ? "gap-6" : "",
        wrapperClassName,
      )}
      style={{ overflow: isOpen === itemKey ? "visible" : "hidden" }}
    >
      {/* topSection and chevron  */}
      <div
        className={clsx(
          "flex w-full items-center justify-between",
          topSectionClassName,
        )}
      >
        {topSection}
        <div
          className={clsx("flex h-12 flex-col items-end justify-center py-1")}
        >
          {isOpen !== itemKey ? (
            <FaChevronDown
              className={clsx("text-accentText h-3 w-3", chevronClassName)}
            />
          ) : (
            <FaChevronUp
              className={clsx("text-accentText h-3 w-3", chevronClassName)}
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
          height:
            isOpen === itemKey
              ? `${contentRef?.current?.scrollHeight}px`
              : "0px",
          overflow: isOpen === itemKey ? "visible" : "hidden",
          transition: "height 0.3s ease",
        }}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
}

export default CollapseItem;
