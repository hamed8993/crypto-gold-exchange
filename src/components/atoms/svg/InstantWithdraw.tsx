interface InstantWithdrawSVGProps {
  height?: string;
  width?: string;
}

const InstantWithdrawSVG = ({ height, width }: InstantWithdrawSVGProps) => {
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
        fill="url(#paint0_radial_17589_13557)"
      />
      <rect x="1" y="0.5" width="79" height="79" rx="39.5" stroke="#344054" />
      <path
        d="M41.8332 26.667L29.9578 40.9175C29.4928 41.4756 29.2602 41.7546 29.2567 41.9903C29.2536 42.1951 29.3449 42.3901 29.5042 42.5189C29.6876 42.667 30.0508 42.667 30.7773 42.667H40.4999L39.1666 53.3337L51.042 39.0832C51.507 38.5251 51.7396 38.246 51.7431 38.0104C51.7462 37.8055 51.6549 37.6106 51.4956 37.4818C51.3122 37.3337 50.949 37.3337 50.2225 37.3337H40.4999L41.8332 26.667Z"
        stroke="#53B1FD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <radialGradient
          id="paint0_radial_17589_13557"
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

export default InstantWithdrawSVG;
