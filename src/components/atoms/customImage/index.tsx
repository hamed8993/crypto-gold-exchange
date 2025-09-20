"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";

interface CustomImageProps {
  alt: string;
  src?: string;
  width: number;
  height: number;
  darkSrc?: string;
  lightSrc?: string;
  className?: string;
  themeRequired?: boolean;
}

function CustomImage({
  src,
  alt,
  width,
  height,
  darkSrc,
  lightSrc,
  className,
  themeRequired,
}: CustomImageProps) {
  const { theme } = useTheme();

  const source = themeRequired ? (theme === "dark" ? darkSrc : lightSrc) : src;

  return (
    <Image
      alt={alt}
      width={width}
      height={height}
      className={clsx("mt-3 self-center", className)}
      src={source || ""}
    />
  );
}

export default CustomImage;
