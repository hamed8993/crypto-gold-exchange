"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";

const Theme = ({ children }: ThemeProviderProps) => {
  return <ThemeProvider attribute={"class"}>{children}</ThemeProvider>;
};

export default Theme;
