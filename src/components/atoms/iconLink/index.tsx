import Link from "next/link";
import { ReactNode } from "react";
import useUrl from "@/core/hooks/useUrl";

interface IconLinkProps {
  href: string;
  text: string;
  icon: ReactNode;
}

function IconLink({ href, icon, text }: IconLinkProps) {
  const { locale } = useUrl();

  return (
    <Link
      className="flex items-center gap-2"
      href={`/${locale}${href}`}
      prefetch
    >
      {icon}
      <span className="text-sm text-mainBrand">{text}</span>
    </Link>
  );
}

export default IconLink;
