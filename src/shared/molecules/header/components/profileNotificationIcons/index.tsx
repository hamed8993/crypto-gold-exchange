import { CiUser } from "react-icons/ci";
import NotifiedBell from "../notifiedBell";

interface ProfileNotificationIconsProps {
  hasNotification?: boolean;
}

function ProfileNotificationIcons({
  hasNotification,
}: ProfileNotificationIconsProps) {
  return (
    <div className="flex items-center gap-3">
      <NotifiedBell hasNotification={hasNotification} />
      <CiUser className="text-textPrimary size-6" />
    </div>
  );
}

export default ProfileNotificationIcons;
