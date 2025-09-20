import Image from "next/image";

interface DoubleImageProps {
  src1: string;
  src2: string;
  size1: number;
  size2: number;
}

function DoubleImage({ src1, src2, size1, size2 }: DoubleImageProps) {
  return (
    <span className="relative min-h-10 min-w-10">
      <Image
        className="rounded-full"
        alt="gold"
        height={size1}
        src={src1}
        width={size1}
      />
      <Image
        alt="gold"
        className="absolute bottom-0 right-0 rounded-full"
        height={size2}
        src={src2}
        width={size2}
      />
    </span>
  );
}

export default DoubleImage;
