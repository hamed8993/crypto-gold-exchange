import PwaPageLayout from "@/components/organisms/layout";
import { useTranslations } from "next-intl";
import UserDetailBox from "./components/userDetailBox";

interface ProfilePageProps {
  className?: string;
}

function ProfilePage({ className }: ProfilePageProps) {
  const t = useTranslations();

  return (
    <PwaPageLayout
      wrapperClassName={className}
      title={t("profile")}
      hasBackChevron
    >
      <UserDetailBox />
    </PwaPageLayout>
  );
}

export default ProfilePage;
