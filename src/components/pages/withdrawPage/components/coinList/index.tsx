import CoinItem from "./components/coinItem";

function CoinsList() {
  const searchedData = [
    {
      coin: "irt",
    },
    {
      coin: "usd",
    },
  ];

  return (
    <div className="mt-2 flex w-full items-center justify-between gap-2">
      {searchedData?.map((item) => {
        return <CoinItem coin={item?.coin} key={item?.coin} />;
      })}
    </div>
  );
}

export default CoinsList;
