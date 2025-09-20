import { useGetUser_dataAccount_details } from "@/core/services/hooks";
import ProfileDetailRow from "../profileDetailRow";
import ProfileSecondDetailRow from "../profileSecondDetailRow";
import UserIdName from "../userIdName";

function ProfileBox() {
  const { data } = useGetUser_dataAccount_details();

  return (
    <div className="bg-surface flex w-full flex-col items-start justify-start gap-3 rounded-xl p-4">
      <UserIdName
        id={data?.result?.user_id}
        name={
          data?.result?.name && data.result.family_name
            ? `${data?.result?.name} ${data?.result?.family_name}`
            : ""
        }
      />

      <ProfileDetailRow />

      <ProfileSecondDetailRow />
    </div>
  );
}

export default ProfileBox;
