import DesktopProfilePage from "@/components/pages/ProfilePageDesktop";
import ProfilePage from "@/components/pages/profilePage";

function Profile() {
  return (
    <>
      <DesktopProfilePage className="hidden md:block" />
      <ProfilePage className="md:hidden" />
    </>
  );
}

export default Profile;
