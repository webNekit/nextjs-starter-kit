"use client";

import { useEffect, useState } from "react";

export function useSessionTimer(startTime: number) {
    const [ timeString, setTimeString ] = useState("00:00:00");
    const [ isMounted, setIsMounted ] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const updateTimer = () => {
            const now = Date.now();
            const diff = now - startTime;

            if (diff < 0) {
                setTimeString("00:00:00");
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            const format = (num: number) => num.toString().padStart(2, "0");
            setTimeString(`${format(hours)}:${format(minutes)}:${format(seconds)}`);
        };

        updateTimer();
        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, [startTime]);

    return { timeString, isMounted };
}