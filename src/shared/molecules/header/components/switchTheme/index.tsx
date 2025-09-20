import clsx from "clsx";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
interface SwitchThemeProps {
  hasScrolled: boolean;
  hasHeaderBg?: boolean;
}

function SwitchTheme({ hasScrolled, hasHeaderBg }: SwitchThemeProps) {
  const { theme, setTheme } = useTheme();

  const themeHandler = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  console.log("theme", theme);

  return (
    <>
      <button
        type="button"
        className="hidden h-10 w-10 items-center justify-center ps-4 lg:flex"
        onClick={themeHandler}
      >
        {theme === "light" ? (
          <IoMoonOutline
            className={clsx(
              "scale-125",
              hasHeaderBg && !hasScrolled
                ? "text-mainTextDark"
                : "text-mainText",
            )}
          />
        ) : (
          <MdOutlineWbSunny
            className={clsx(
              "scale-125",
              hasHeaderBg && !hasScrolled
                ? "text-mainTextDark"
                : "text-mainText",
            )}
          />
        )}
      </button>

      <div
        dir="rtl"
        className="bg-bgMuted relative flex h-[38px] w-[93px] items-center justify-between rounded-[64px] p-1 lg:hidden"
      >
        <motion.span
          layout
          className="bg-bgAccent absolute z-0 block size-[30px] rounded-full"
          initial={{ left: theme === "dark" ? 4 : "calc(100% - 34px)" }}
          animate={{ left: theme === "dark" ? 4 : "calc(100% - 34px)" }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
        />

        <button
          className="relative z-10 flex size-[30px] items-center justify-center rounded-full bg-transparent"
          onClick={() => setTheme("light")}
        >
          <MdOutlineWbSunny className="text-constantLight size-5 scale-125" />
        </button>

        <button
          className="relative z-10 flex size-[30px] items-center justify-center rounded-full bg-transparent"
          onClick={() => setTheme("dark")}
        >
          <IoMoonOutline className="text-iconDisabled size-5 scale-125" />
        </button>
      </div>
    </>
  );
}

export default SwitchTheme;
