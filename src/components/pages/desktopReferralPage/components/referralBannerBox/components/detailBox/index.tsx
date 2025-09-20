interface DetailBoxProps {
  title: string;
  value: string;
  quote: string;
}

function DetailBox({ quote, title, value }: DetailBoxProps) {
  return (
    <div className="border-secondBackground flex h-24 w-[30%] flex-col items-center justify-between rounded-xl border-2">
      <div className="bg-secondBackground flex w-full items-center justify-center rounded-t-[10px] py-4">
        <p className="text-mainText text-center text-xs">{title}</p>
      </div>
      <div className="flex h-full w-full items-center justify-center gap-1">
        <p className="font-english text-mainText text-sm">{value}</p>
        <p className="text-accentText text-xs">{quote}</p>
      </div>
    </div>
  );
}

export default DetailBox;
