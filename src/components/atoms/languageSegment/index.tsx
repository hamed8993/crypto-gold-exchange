"use client";

import useUrl from "@/core/hooks/useUrl";

const options = [
  { language: "English", locale: "en" },
  { language: "فارسی", locale: "fa" },
];

function LanguageSegment() {
  const { locale } = useUrl();

  return (
    <div className="relative flex w-fit rounded-xl bg-gray-200">
      {options.map((option) => (
        <button
          className={`relative z-10 rounded-xl px-2 py-2 text-xs transition-colors duration-300 ${
            locale === option.locale ? "text-white" : "text-gray-600"
          }`}
          key={option.locale}
        >
          {option.language}
        </button>
      ))}
      <div
        className="absolute left-0 top-0 h-full rounded-xl bg-blue-500 transition-all duration-300"
        style={{
          width: `${100 / options.length}%`,
        }}
      />
    </div>
  );
}

export default LanguageSegment;
