interface TightSpreadsSVGProps {
  height?: string;
  width?: string;
}

const TightSpreadsSVG = ({ height, width }: TightSpreadsSVGProps) => {
  return (
    <svg
      width={width || "80"}
      height={height || "80"}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="79"
        height="79"
        rx="39.5"
        fill="url(#paint0_radial_17589_7494)"
      />
      <rect x="0.5" y="0.5" width="79" height="79" rx="39.5" stroke="#344054" />
      <path
        d="M29.3333 42.6667H37.3333M37.3333 42.6667V50.6667M37.3333 42.6667L28 52M50.6667 37.3333H42.6667M42.6667 37.3333V29.3333M42.6667 37.3333L52 28"
        stroke="#53B1FD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <radialGradient
          id="paint0_radial_17589_7494"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(39.4667 -12.8) rotate(90) scale(99.7333)"
        >
          <stop stopColor="#182230" />
          <stop offset="1" stopColor="#0C111D" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default TightSpreadsSVG;
