import DepositPage from "@/components/pages/depositPage";
import DesktopDepositPage from "@/components/pages/desktopDepositPage";

function Deposit() {
  return (
    <>
      <DesktopDepositPage className="hidden md:block" />
      <DepositPage className="md:hidden" />
    </>
  );
}

export default Deposit;
