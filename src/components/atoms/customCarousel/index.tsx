"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import clsx from "clsx";

interface CustomCarouselProps {
  className?: string;
  items: Array<string>;
}

const CustomCarousel = ({ className, items }: CustomCarouselProps) => {
  const [index, setIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    controls.start({
      x: `${index * 100}%`,
      transition: { duration: 0.8, ease: "easeInOut" },
    });
  }, [index, controls]);

  return (
    <div
      className={clsx("relative w-full overflow-hidden rounded-lg", className)}
    >
      <motion.div animate={controls} className="flex w-full">
        {items.map((src, i) => (
          <div
            key={i}
            className="w-full shrink-0 bg-mainBackground px-4 py-6 dark:bg-mainBackgroundDark"
          >
            <img
              src={src}
              alt={`Slide ${i}`}
              className="w-full shrink-0"
            />

            <p className="mt-5 w-full self-center text-center text-sm text-mainText dark:text-mainTextDark">
              {
                "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است"
              }
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CustomCarousel;
