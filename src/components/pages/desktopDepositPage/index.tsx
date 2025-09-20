"use client";

import { DesktopPageLayout } from "@/components/organisms/desktopLayout";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import DepositForm from "./components/depositForm";
import PaymentAddress from "./components/paymentAddress";
import {
  DesktopDepositContextProvider,
  useDesktopDepositContext,
} from "./provider";

interface DesktopDepositPageProps {
  className?: string;
}

function Component({ className }: DesktopDepositPageProps) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const { watch } = useDesktopDepositContext();

  const deposit_id = watch("deposit_id") || searchParams.get("depositId") || "";

  return (
    <DesktopPageLayout className={className} hasHeader hasFooter hasSideMenu>
      <div className="flex min-h-screen w-full flex-col px-12 py-3">
        <p className="mb-6 text-[28px] text-mainText dark:text-mainTextDark">
          {t("deposit")}
        </p>
        <div className="grid h-full w-full grid-cols-1 gap-4 xl:grid-cols-12">
          <DepositForm />
          {deposit_id && <PaymentAddress deposit_id={deposit_id} />}
        </div>
      </div>
    </DesktopPageLayout>
  );
}

export default function DesktopDepositPage({
  ...rest
}: DesktopDepositPageProps) {
  return (
    <DesktopDepositContextProvider>
      <Component {...rest} />
    </DesktopDepositContextProvider>
  );
}
