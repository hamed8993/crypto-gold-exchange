import DesktopWithdrawPage from "@/components/pages/desktopWithdrawPage";
import WithdrawPage from "@/components/pages/withdrawPage";

function Withdraw() {
  return (
    <>
      <DesktopWithdrawPage className="hidden md:block" />
      <WithdrawPage className="md:hidden" />
    </>
  );
}

export default Withdraw;
