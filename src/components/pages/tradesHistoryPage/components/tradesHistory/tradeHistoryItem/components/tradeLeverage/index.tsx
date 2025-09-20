interface TradeLeverageProps {
  leverage: string;
}

function TradeLeverage({ leverage }: TradeLeverageProps) {
  return (
    <div
      className={
        "flex items-center justify-center rounded-md bg-mainBrandAlternative px-2 py-1 opacity-70"
      }
    >
      <p className="font-english text-xs text-white">{`${leverage}X`}</p>
    </div>
  );
}

export default TradeLeverage;
