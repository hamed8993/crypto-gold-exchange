interface DetailRowProps {
  value: string;
  title: string;
}

function DetailRow({ title, value }: DetailRowProps) {
  return (
    <div className="mt-2 flex h-12 w-full items-center justify-between rounded-lg">
      <div className="bg-mainBrand flex h-full w-[35%] items-center justify-start rounded-s-lg px-2">
        <p className="text-mainText text-sm">{title}</p>
      </div>
      <div className="bg-surface flex h-full w-[65%] items-center justify-end rounded-e-lg px-2">
        <p className="font-english text-mainText text-sm">{value}</p>
      </div>
    </div>
  );
}

export default DetailRow;
