import ManageDevicesPage from "@/components/pages/manageDevicesPage";
import ManageDevicesPageDesktop from "@/components/pages/manageDevicesPageDesktop";

function manageDevices() {
  return (
    <>
      <ManageDevicesPage className="md:hidden" />
      <ManageDevicesPageDesktop className="hidden md:block" />
    </>
  );
}

export default manageDevices;
