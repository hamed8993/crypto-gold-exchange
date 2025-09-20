interface VolPercentageProps {
  title: string;
  value?: string | number;
}

function VolPercentage({ title, value }: VolPercentageProps) {
  return (
    <div className="flex flex-col items-center justify-start gap-2">
      <p className="text-accentText text-xs">{title}</p>
      <p className="font-english text-mainText text-lg">{`${value || ""}%`}</p>
    </div>
  );
}

export default VolPercentage;
