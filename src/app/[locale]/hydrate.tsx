"use client";

import { HydrationBoundary } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Hydrate(props: any) {
  return <HydrationBoundary {...props} />;
}
