import Tab from "./components/tab";

function TransactionTabs() {
  return (
    <div className={"mb-6 flex gap-1"}>
      <Tab value="deposit" />
      <Tab value="withdraw" />
    </div>
  );
}

export default TransactionTabs;
