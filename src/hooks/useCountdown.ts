"use client";

import { useState, useEffect } from "react";
import { getTimeRemaining } from "@/lib/utils";

export function useCountdown(endTime: string) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(endTime));

  useEffect(() => {
    if (timeLeft.isEnded) return;

    const interval = setInterval(() => {
      const remaining = getTimeRemaining(endTime);
      setTimeLeft(remaining);

      if (remaining.isEnded) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, timeLeft.isEnded]);

  return timeLeft;
}