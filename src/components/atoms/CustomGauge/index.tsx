// components/Gauge.tsx
"use client";

interface GaugeProps {
  green: number;
  needleColor: string;
}

export default function Gauge({ green, needleColor }: GaugeProps) {
  const red = 100 - green;
  const radius = 90;
  const stroke = 20;
  const circumference = Math.PI * radius;

  const greenLength = (green / 100) * circumference;
  const redLength = circumference - greenLength;

  return (
    <div className="relative h-32 w-full">
      <svg viewBox="0 0 200 100" className="h-full w-full">
        {/* Background Arc */}
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="transparent"
          stroke="#1e1e1e"
          strokeWidth={stroke}
        />

        {/* Red Arc */}
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="transparent"
          stroke="#940505"
          strokeWidth={stroke}
          className="absolute"
          strokeDasharray={`${redLength} ${circumference}`}
        />
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="transparent"
          stroke="#ef4444"
          strokeWidth={stroke - 7}
          strokeDasharray={`${redLength} ${circumference}`}
        />

        {/* Green Arc */}
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="transparent"
          stroke="#087F57"
          strokeWidth={stroke}
          strokeDasharray={`${greenLength} ${circumference}`}
          strokeDashoffset={-redLength}
        />
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="transparent"
          stroke="#10b981"
          strokeWidth={stroke - 7}
          strokeDasharray={`${greenLength} ${circumference}`}
          strokeDashoffset={-redLength}
        />

        {/* Needle */}
        <line
          x1="100"
          y1="100"
          x2={100 - 75 * Math.cos(Math.PI * (red / 100))}
          y2={100 - 75 * Math.sin(Math.PI * (red / 100))}
          stroke={needleColor}
          strokeWidth="2"
        />

        {/* <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 text-sm text-white">
          <span>Red: {red}%</span>
          <span>Green: {green}%</span>
        </div> */}
      </svg>
    </div>
  );
}
