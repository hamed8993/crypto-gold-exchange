import EmptyView from "@/components/atoms/emptyView";
import LoadingView from "@/components/atoms/loadingView";
import { useAuth } from "@/core/providers/authProvider";
import { useGetUser_dataGet_referral_codes } from "@/core/services/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Pagination from "../../../../molecules/pagination";
import ReferralDetailModal from "../referralDetailModal";
import ReferralItem from "./components/referralItem";
import TableHeader from "./components/tableHeader";

function MyReferrals() {
  const t = useTranslations();
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReferralItem, setSelectedReferralItem] = useState(-1);
  const [page, setPage] = useState<number>(1);

  const { data, isPending } = useGetUser_dataGet_referral_codes({
    enabled: isLoggedIn,
  });
  const list = data?.result?.refCodes;

  const maxRowsPerPage = 10;
  const lastPage = list ? Math.ceil(list.length / maxRowsPerPage) : 1;
  const paginatedList = list?.slice(
    (page - 1) * maxRowsPerPage,
    page * maxRowsPerPage,
  );

  return (
    <div className="mt-2 flex h-full w-full flex-col items-center justify-around rounded-xl bg-surface p-3 dark:bg-surfaceDark">
      <p className="mx-3 mt-4 self-start text-justify text-base text-mainText dark:text-mainTextDark">
        {t("referralLinksTitle")}
      </p>
      <TableHeader />
      {isPending ? (
        <LoadingView />
      ) : Number(list?.length) > 0 ? (
        paginatedList?.map((item, index) => {
          return (
            <ReferralItem
              key={index}
              setSelectedReferralItem={setSelectedReferralItem}
              code={item?.code}
              setIsOpen={setIsOpen}
              income={item?.income}
              index={index}
              referrerShare={item?.referrerShare}
              subsetCount={item?.subsetCount}
              subsetShare={item?.subsetShare}
            />
          );
        })
      ) : (
        <EmptyView />
      )}
      <Pagination
        lastPage={lastPage}
        page={page}
        setPage={(page) => {
          setPage(page);
        }}
      />
      <ReferralDetailModal
        item={list?.[selectedReferralItem]}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default MyReferrals;
