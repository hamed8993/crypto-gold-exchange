import CustomDateTime from "@/components/atoms/customDateTime";
import DrawerPageInstant from "@/components/atoms/drawerPageInstant";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataClaim_referral_history } from "@/core/services/hooks";
import { addCommaSeparator } from "@/core/utilities/addCommaSeparator";
import { useTranslations } from "next-intl";

interface ReferralHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferralHistoryDrawer = ({
  isOpen,
  onClose,
}: ReferralHistoryDrawerProps) => {
  const { isLoggedIn } = useAuth();

  const t = useTranslations();

  const { data } = useGetUser_dataClaim_referral_history({
    enabled: isLoggedIn,
  });
  const historyData = data?.result;
  return (
    <DrawerPageInstant isOpen={isOpen} onClose={onClose}>
      {["1", historyData]?.map((_, index) => {
        return (
          <div
            className="border-accentText50 grid grid-cols-2 grid-rows-2 gap-2 border-b px-2 pt-3 pb-2"
            key={index}
          >
            <div className="flex items-center justify-start gap-2">
              <span className="text-accentText text-xs">{`${t("time")}:`}</span>
              {/* <CustomDateTime timeStamp={item.time} /> */}
              <CustomDateTime timeStamp={"1748360377"} />
            </div>

            <div className="flex items-center justify-end gap-2">
              <span className="text-accentText text-xs">
                {`${t("balance_before")}:`}
              </span>
              <span className="text-mainText text-xs">
                {/* {item.blanace_beofre } */}
                {addCommaSeparator("123123123")}
              </span>
            </div>

            <div className="flex items-center justify-start gap-2">
              <span className="text-accentText text-xs">
                {`${t("amount")}:`}
              </span>
              <span className="text-mainText text-xs">
                {/* {addCommaSeparator(item.amount)} */}
                {addCommaSeparator("10000")}
              </span>
            </div>

            <div className="flex items-center justify-end gap-2">
              <span className="text-accentText text-xs">
                {`${t("balance_after")}:`}
              </span>
              <span className="text-mainText text-xs">
                {/* {item.blanace_after } */}
                {addCommaSeparator("123123123")}
              </span>
            </div>
          </div>
        );
      })}
    </DrawerPageInstant>
  );
};

export default ReferralHistoryDrawer;
