interface SeamlessExecutionSVGProps {
  height?: string;
  width?: string;
}

const SeamlessExecutionSVG = ({ height, width }: SeamlessExecutionSVGProps) => {
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
        fill="url(#paint0_radial_17589_18636)"
      />
      <rect x="0.5" y="0.5" width="79" height="79" rx="39.5" stroke="#344054" />
      <path
        d="M43.3334 49.3337L46.0001 52.0003L52.0001 46.0003M53.3136 40.7335C53.3268 40.4908 53.3334 40.2463 53.3334 40.0003C53.3334 32.6365 47.3639 26.667 40.0001 26.667C32.6363 26.667 26.6667 32.6365 26.6667 40.0003C26.6667 47.2475 32.4488 53.1443 39.6514 53.3292M40.0001 32.0003V40.0003L44.9846 42.4926"
        stroke="#53B1FD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <radialGradient
          id="paint0_radial_17589_18636"
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

export default SeamlessExecutionSVG;
