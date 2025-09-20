"use client";

// import { LuUpload } from "react-icons/lu";
import { Fragment, useState } from "react";
import SettingsItem from "../settingsItem";
// import { CiViewList } from "react-icons/ci";
// import { LuDownload } from "react-icons/lu";
import RowLink from "@/components/atoms/rowLink";
import { useTranslations } from "next-intl";
// import { FaClipboardList } from "react-icons/fa6";
// import { IoTicketOutline } from "react-icons/io5";
// import { PiUserCircleFill } from "react-icons/pi";
import { RoutesName } from "@/core/constants/routes";
// import { LuChartNoAxesCombined } from "react-icons/lu";
import { SiGoogleauthenticator } from "react-icons/si";
// import { LiaUserFriendsSolid } from "react-icons/lia";
import { useAuth } from "@/core/providers/authProvider";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import ChangePasswordDrawer from "../changePasswordDrawer";

function MainOptions() {
  const t = useTranslations();

  const { isLoggedIn } = useAuth();

  const [drawerType, setDrawerType] = useState<"email" | "password" | "none">(
    "none",
  );

  const openChangeEmailDrawer = () => {
    setDrawerType("email");
  };

  const closeDrawer = () => {
    setDrawerType("none");
  };

  const openPasswordDrawer = () => {
    setDrawerType("password");
  };

  return (
    <div className="divide-y-border bg-surface mb-2 flex h-fit w-full flex-col divide-y rounded-lg">
      {isLoggedIn && (
        <Fragment>
          <SettingsItem
            icon={<MdOutlineEmail className="text-negative h-6 w-6" />}
            onClick={openChangeEmailDrawer}
            text={t("changeEmail")}
          />

          <SettingsItem
            icon={<MdOutlinePassword className="text-negative h-6 w-6" />}
            onClick={openPasswordDrawer}
            text={t("changePassword")}
          />

          <RowLink
            href={RoutesName.tfa}
            icon={<SiGoogleauthenticator className="text-negative h-6 w-6" />}
            text={t("tfa")}
          />
        </Fragment>
      )}

      {isLoggedIn && (
        <ChangePasswordDrawer
          isOpen={drawerType === "password"}
          onClose={closeDrawer}
        />
      )}
    </div>
  );
}

export default MainOptions;
