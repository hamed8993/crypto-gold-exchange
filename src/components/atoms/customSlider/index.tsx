/* eslint-disable @typescript-eslint/ban-ts-comment */
import clsx from "clsx";
import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";

interface CustomSliderProps {
  max?: number;
  min?: number;
  step?: number;
  value?: number;
  dir?: "rtl" | "ltr";
  wrapperClassName?: string;
  onChange?: (value: number) => void;
}

const CustomSlider = ({
  dir = "ltr",
  max = 100,
  onChange,
  min = 0,
  step = 1,
  value = 0,
  wrapperClassName,
}: CustomSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateValue = (clientX: number) => {
    if (!sliderRef.current) return;

    const { left, width, right } = sliderRef.current.getBoundingClientRect();
    let newValue;

    if (dir === "ltr") {
      newValue = ((clientX - left) / width) * (max - min) + min;
    } else {
      newValue = ((right - clientX) / width) * (max - min) + min;
    }

    newValue = Math.round(newValue / step) * step;
    newValue = Math.max(min, Math.min(max, newValue));

    if (onChange) onChange(newValue);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    calculateValue(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent<Document>) => {
    if (isDragging) {
      calculateValue(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    calculateValue(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<Document>) => {
    if (isDragging) {
      calculateValue(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      // @ts-ignore
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      // @ts-ignore
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    } else {
      // @ts-ignore
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      // @ts-ignore
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    }

    return () => {
      // @ts-ignore
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      // @ts-ignore
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return (
    <div
      ref={sliderRef}
      className={clsx(
        "relative h-1 w-full cursor-pointer rounded-md bg-gray-300",
        wrapperClassName,
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{ direction: dir }}
    >
      {/* Track */}
      <div
        className="absolute h-1 rounded-md bg-blue-500"
        style={{
          [dir === "ltr" ? "left" : "right"]: 0,
          width: `${((value - min) / (max - min)) * 100}%`,
        }}
      ></div>

      {/* Thumb */}
      <div
        className="absolute top-1/2 h-6 w-6 -translate-y-1/2 transform cursor-pointer rounded-full bg-blue-500"
        style={{
          [dir === "ltr" ? "left" : "right"]:
            `${((value - min) / (max - min)) * 100}%`,
          transform: `${dir === "ltr" ? "translate(-50%, -50%)" : "translate(50%, -50%)"}`,
        }}
      ></div>
    </div>
  );
};

export default CustomSlider;
