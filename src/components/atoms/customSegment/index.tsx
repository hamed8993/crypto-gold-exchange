interface CustomSegmentProps {
  options: string[];
  activeTab: string;
  onClick: (selectedTab: string) => void;
}

function CustomSegment({ options, activeTab, onClick }: CustomSegmentProps) {
  return (
    <div
      dir="rtl"
      className="relative flex w-fit rounded-xl bg-accentText dark:bg-accentTextDark"
    >
      {options.map((option) => {
        return (
          <button
            onClick={() => onClick(option)}
            className={`z-10 min-w-20 rounded-xl py-2 transition-colors ${
              // handle first instance of segment that activeTab has no value
              activeTab === option || (!activeTab && option !== options[1])
                ? "text-white"
                : "text-gray-600"
            }`}
            key={option}
          >
            {option}
          </button>
        );
      })}
      <div
        className={`absolute top-0 h-full rounded-xl bg-blue-500 transition-all duration-300 ${
          activeTab === options[1] ? "left-0" : "left-1/2"
        }`}
        style={{
          width: `${100 / options.length}%`,
        }}
      />
    </div>
  );
}

export default CustomSegment;
