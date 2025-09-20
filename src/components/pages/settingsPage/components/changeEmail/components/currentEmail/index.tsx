import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataAccount_details } from "@/core/services/hooks";
import { useTranslations } from "next-intl";

function CurrentEmail() {
  const t = useTranslations();

  const { isLoggedIn } = useAuth();

  const { data: dataAccountDetails } = useGetUser_dataAccount_details({
    enabled: isLoggedIn,
  });
  const userAccountDetails = dataAccountDetails?.result;

  return (
    <div className="mt-5 mb-1 flex w-full items-center justify-between">
      <span className="text-accentText text-[10px]">{t("currentEmail")}</span>
      <span className="text-accentText text-xs">
        {userAccountDetails?.email}
      </span>
    </div>
  );
}

export default CurrentEmail;
