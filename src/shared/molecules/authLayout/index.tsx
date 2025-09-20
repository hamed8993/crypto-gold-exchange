import clsx from "clsx";
import { ReactNode } from "react";

interface AuthenticationLayoutProps {
  className?: string;
  children?: ReactNode;
}

function AuthenticationLayout({
  children,
  className,
}: AuthenticationLayoutProps) {
  return (
    <div
      className={clsx(
        "flex min-h-screen w-full items-stretch bg-bgDefault",
        className,
      )}
    >
      <div className="bg-red-500 2xl:w-[30%]" />
      <div className="w-full 2xl:w-[70%]">{children}</div>
    </div>
  );
}

export default AuthenticationLayout;
