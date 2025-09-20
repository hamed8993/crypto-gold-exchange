"use client";

import HeaderSection from "@/components/molecules/headerSection";
import { useEffect, useRef, useState } from "react";
interface DesktopHeaderProps {
  hasHeaderBg?: boolean;
}
function DesktopHeader({ hasHeaderBg }: DesktopHeaderProps) {
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) setHasScrolled(false);

      if (currentScrollY > lastScrollY.current) {
        setHasScrolled(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <HeaderSection hasHeaderBg={hasHeaderBg} hasScrolled={hasScrolled} />;
}

export default DesktopHeader;
