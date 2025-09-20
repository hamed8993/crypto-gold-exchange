import { useCallback, useEffect, useReducer, useRef } from "react";
import {
  getInitialState,
  onDecrement,
  onReset,
  onStart,
  onStop,
  reducer,
} from "./reducer";

type Options = {
  step?: number;
  interval?: number;
  start: number;
  end: number;
  onComplete?: () => void;
  startOnMount?: boolean;
};

export const useCounter = ({
  start,
  end,
  onComplete,
  startOnMount,
  ...options
}: Options) => {
  const intervalHandle = useRef<NodeJS.Timeout | undefined>(undefined);

  const [{ canStart, count, isCounting }, dispatch] = useReducer(
    reducer,
    getInitialState(start, startOnMount),
  );

  const startCounting = useCallback(
    (newStart?: number) => {
      dispatch(onStart(newStart ?? start));
    },
    [start],
  );

  const stopCounting = () => {
    clearInterval(intervalHandle.current);
    dispatch(onStop());
  };

  const reset = (newStart?: number) => {
    clearInterval(intervalHandle.current);
    dispatch(onReset(newStart ?? start));
  };

  useEffect(() => {
    if (startOnMount) startCounting();
  }, [startCounting, startOnMount]);

  useEffect(() => {
    if (!canStart) return;
    if (typeof start !== "number" || typeof end !== "number") return;
    if (start < 0 || end < 0) return;
    const interval = options?.interval || 1000;

    const countingIndex = () => {
      const step = options?.step ?? 1;
      const signedStep = start < end ? step : -step;
      const absStep = Math.abs(count - end);
      if (absStep < step) {
        return start < end ? absStep : -absStep;
      }
      return signedStep;
    };

    if (count === end) {
      stopCounting();
      onComplete?.();
      return;
    }

    intervalHandle.current = setInterval(() => {
      dispatch(onDecrement(count + countingIndex()));
    }, interval);

    return () => clearInterval(intervalHandle.current);
  }, [canStart, count, end, onComplete, options, start]);

  return {
    startCounting,
    reset,
    count,
    isCounting,
  };
};
