import { useState } from "react";

export function useHandleSort<KeyType>() {
  const [sortConfig, setSortConfig] = useState<{
    key: KeyType;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: KeyType) => {
    const prevDir = sortConfig?.direction;
    setSortConfig({
      key,
      direction: prevDir === "asc" ? "desc" : "asc",
    });
  };

  return { sortConfig, handleSort };
}
