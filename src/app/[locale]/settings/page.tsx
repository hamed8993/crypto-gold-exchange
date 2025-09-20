import SettingsPage from "@/components/pages/settingsPage";
import SettingsPageDesktop from "@/components/pages/settingsPageDesktop";

function Settings() {
  return (
    <>
      <SettingsPageDesktop className="hidden md:block" />
      <SettingsPage className="md:hidden" />
    </>
  );
}

export default Settings;
