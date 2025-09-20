import { ReactNode } from "react";

interface SideLinkProps {
  href?: string;
  icon?: ReactNode;
  title?: string;
}

const SideLink = ({ href, icon, title }: SideLinkProps) => {
  return (
    <li className="py-2">
      <a
        href={href}
        className="flex items-center justify-start gap-2 text-nowrap rounded-md p-2 text-mainText hover:bg-positive dark:text-mainTextDark"
      >
        {icon}
        {title}
      </a>
    </li>
  );
};

export default SideLink;
