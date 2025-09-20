import { useContext } from "react";
import { SideDrawerContext } from "@/core/providers/sideDrawerProvider";

export const useSideDrawer = () => {
  const { ...contextData } = useContext(SideDrawerContext);

  return {
    ...contextData,
  };
};
