import React, { memo, useEffect, useState } from "react";

let isStickyReady = false;

interface StickyComponentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const StickyComponent = memo(
  ({ children, className, style, id }: StickyComponentProps) => {
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

    useEffect(() => {
      let componentOffsetFromBottom = 0;

      if (id) {
        const targetEl = document.getElementById(id);

        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          componentOffsetFromBottom = window.innerHeight - rect.bottom - 120;
        }

        setKeyboardHeight(componentOffsetFromBottom);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const initialHeight = window.visualViewport?.height || 0;

        let componentOffsetFromBottom = 0;

        if (id) {
          const targetEl = document.getElementById(id);

          if (targetEl) {
            const rect = targetEl.getBoundingClientRect();
            componentOffsetFromBottom = window.innerHeight - rect.bottom - 120;
          }
        }

        const handleResize = () => {
          const viewport = window.visualViewport;
          const viewportHeight = viewport?.height || 0;
          const viewportOffset = viewport?.offsetTop || 0;

          const heightDiff = id
            ? initialHeight - viewportHeight !== 0
              ? initialHeight -
                viewportHeight -
                viewportOffset -
                componentOffsetFromBottom +
                (initialHeight - viewportHeight) * 0.42
              : initialHeight -
                  viewportHeight -
                  viewportOffset +
                  componentOffsetFromBottom || 0
            : initialHeight - viewportHeight - viewportOffset;

          setKeyboardHeight(heightDiff);
        };

        window.visualViewport?.addEventListener("resize", handleResize);
        window.visualViewport?.addEventListener("scroll", handleResize);

        isStickyReady = true;

        return () => {
          window.visualViewport?.removeEventListener("resize", handleResize);
          window.visualViewport?.removeEventListener("scroll", handleResize);
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        style={{
          ...style,
          bottom: keyboardHeight,
          position: "absolute",
        }}
        className={className}
        id={id}
      >
        {children}
      </div>
    );
  },
);

StickyComponent.displayName = "StickyComponent";

export { isStickyReady, StickyComponent };
