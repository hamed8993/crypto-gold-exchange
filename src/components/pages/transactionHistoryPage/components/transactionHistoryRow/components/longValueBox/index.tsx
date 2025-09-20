interface LongValueBoxProps {
  title: string;
  value?: string;
}

function LongValueBox({ title, value }: LongValueBoxProps) {
  return (
    <div className="flex min-h-[40px] flex-col">
      <p className="text-accentText text-sm">{title}:</p>
      <p className="font-english text-mainText w-fit text-sm" dir="ltr">
        {value || "--"}
      </p>
    </div>
  );
}

export default LongValueBox;
