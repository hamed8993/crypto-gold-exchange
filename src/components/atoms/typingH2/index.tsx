import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
interface TypingH2Props {
  className?: string;
  speed?: number;
  text: string;
}

const TypingH2 = ({ className, text, speed = 50 }: TypingH2Props) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {displayedText}
    </motion.h2>
  );
};

export default TypingH2;
