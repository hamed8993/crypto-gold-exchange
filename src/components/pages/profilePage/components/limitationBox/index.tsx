interface LimitationBoxProps {
  title: string;
  value: string;
}

function LimitationBox({ title, value }: LimitationBoxProps) {
  return (
    <div className="bg-surface flex h-full w-[50%] flex-col items-start justify-between rounded-xl p-4">
      <p className="text-accentText text-sm">{title}</p>
      <p className="font-english text-mainText self-end text-sm">{value}</p>
    </div>
  );
}

export default LimitationBox;
