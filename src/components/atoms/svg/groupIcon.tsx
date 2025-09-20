const GroupIcon = ({
  className,
  color = "black",
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    viewBox="0 0 36 36"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.2222 18H4.77778C2.69056 18 1 16.3094 1 14.2222V4.77778C1 2.69056 2.69056 1 4.77778 1H14.2222C16.3094 1 18 2.69056 18 4.77778V14.2222C18 16.3094 16.3094 18 14.2222 18Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30.2778 33.1112H24.6112C23.0472 33.1112 21.7778 31.8418 21.7778 30.2778V24.6112C21.7778 23.0472 23.0472 21.7778 24.6112 21.7778H30.2778C31.8418 21.7778 33.1112 23.0472 33.1112 24.6112V30.2778C33.1112 31.8418 31.8418 33.1112 30.2778 33.1112Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32.1667 16.1112H26.5001C24.9361 16.1112 23.6667 14.8418 23.6667 13.2778V7.61117C23.6667 6.04717 24.9361 4.77783 26.5001 4.77783H32.1667C33.7307 4.77783 35.0001 6.04717 35.0001 7.61117V13.2778C35.0001 14.8418 33.7307 16.1112 32.1667 16.1112Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.2776 35H7.61092C6.04692 35 4.77759 33.7306 4.77759 32.1666V26.5C4.77759 24.936 6.04692 23.6666 7.61092 23.6666H13.2776C14.8416 23.6666 16.1109 24.936 16.1109 26.5V32.1666C16.1109 33.7306 14.8416 35 13.2776 35Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default GroupIcon;
