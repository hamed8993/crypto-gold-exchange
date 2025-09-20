interface NoCostSVGProps {
  height?: string;
  width?: string;
}

const NoCostSVG = ({ height, width }: NoCostSVGProps) => {
  return (
    <svg
      width={width || "81"}
      height={height || "80"}
      viewBox="0 0 81 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="0.5"
        width="79"
        height="79"
        rx="39.5"
        fill="url(#paint0_radial_17589_18342)"
      />
      <rect x="1" y="0.5" width="79" height="79" rx="39.5" stroke="#344054" />
      <path
        d="M33.8333 41.3333L40.4999 48L47.1666 41.3333M33.8333 32L40.4999 38.6667L47.1666 32"
        stroke="#53B1FD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <radialGradient
          id="paint0_radial_17589_18342"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(39.9667 -12.8) rotate(90) scale(99.7333)"
        >
          <stop stopColor="#182230" />
          <stop offset="1" stopColor="#0C111D" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default NoCostSVG;
