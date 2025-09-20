import { useTranslations } from "next-intl";
import Image from "next/image";

interface UserIdNameProps {
  id?: string;
  name?: string;
}

function UserIdName({ id, name }: UserIdNameProps) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-start gap-3">
      <Image
        alt="Profile"
        className="h-10 w-10 rounded-full"
        height={60}
        src={"/assets/images/user.png"}
        width={60}
      />
      <div className="flex flex-col items-start justify-start">
        <p className="text-mainText text-sm">{name || ""}</p>
        <div className="mt-1 flex items-end justify-start gap-1">
          <p className="text-accentText text-xs">{t("accountID")}:</p>
          <p className="font-english text-mainText text-sm">{id || ""}</p>
        </div>
      </div>
    </div>
  );
}

export default UserIdName;
