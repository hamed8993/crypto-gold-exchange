interface ForexPlatformSVGProps {
  height?: string;
  width?: string;
  className?: string;
}

const ForexPlatformSVG = ({
  height,
  width,
  className,
}: ForexPlatformSVGProps) => {
  return (
    <svg
      width={width || "80"}
      height={height || "80"}
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12v55.76h55.76V12H12Zm52.31 52.31H15.44V15.44h48.87v48.87Z"
        fill="#98A2B3"
      />
      <path
        d="M27.99 48.41c0 6.56 5.33 11.89 11.89 11.89 6.56 0 11.89-5.33 11.89-11.89 0-4.83-2.9-9-7.04-10.85l-1.06-6h5.75l-.67-3.81H43l-.54-3.04h6.11l-.67-3.81H37.34l2.76 15.63h-.21c-.45 0-.9.03-1.34.08l-2.77-15.7h-4.45l3 17.01c-3.77 2-6.34 5.96-6.34 10.51v-.02Zm11.89-7.96c4.38 0 7.95 3.57 7.95 7.95 0 4.38-3.57 7.95-7.95 7.95-4.38 0-7.95-3.57-7.95-7.95 0-4.38 3.57-7.95 7.95-7.95Z"
        fill="#98A2B3"
      />
    </svg>
  );
};

export default ForexPlatformSVG;
