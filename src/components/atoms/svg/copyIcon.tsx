const CopyIcon = ({
  props,
  size = 13,
  color = "#1570EF",
}: {
  props?: React.SVGProps<SVGSVGElement>;
  size?: number;
  color?: string;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <path
      fill={color}
      d="M9.25 3.047V.797H6.625c-.633 0-1.125.515-1.125 1.125v6.75a1.11 1.11 0 0 0 1.125 1.125h4.5c.61 0 1.125-.492 1.125-1.125V3.797H10a.74.74 0 0 1-.75-.75ZM10 .797v2.25h2.25L10 .797Zm-5.25 8.25v-5.25H1.375C.742 3.797.25 4.312.25 4.922v6.75a1.11 1.11 0 0 0 1.125 1.125h4.5c.61 0 1.125-.492 1.125-1.125v-1.125h-.75a1.48 1.48 0 0 1-1.5-1.5Z"
    />
  </svg>
);
export default CopyIcon;
