"use client";
import { useState, useEffect } from "react";

const TaskTimer = ({ startTime }: { startTime: string }) => {
    console.log("🚀 ~ TaskTimer ~ startTime:", startTime);
    const [timeElapsed, setTimeElapsed] = useState<string>("");

    useEffect(() => {
        if (!startTime) return;

        const updateElapsedTime = () => {
            const now = new Date();

            // Combine current date with start time
            const [hours, minutes] = startTime.split(":").map(Number);
            const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

            // Calculate time difference in seconds
            const diffInSeconds = Math.floor((now.getTime() - start.getTime()) / 1000);

            // Convert to hours, minutes, and seconds
            const elapsedHours = Math.floor(diffInSeconds / 3600);
            const elapsedMinutes = Math.floor((diffInSeconds % 3600) / 60);
            const elapsedSeconds = diffInSeconds % 60;

            // Update elapsed time state
            setTimeElapsed(
                `${elapsedHours > 0 ? `${elapsedHours}h ` : ""}${elapsedMinutes > 0 ? `${elapsedMinutes}m ` : ""}${elapsedSeconds}s`
            );
        };

        // Update immediately and then set interval
        updateElapsedTime();
        const interval = setInterval(updateElapsedTime, 1000); // Update every second

        return () => clearInterval(interval); // Clean up on unmount
    }, [startTime]);

    return <div className="flex items-center ">{timeElapsed}</div>;
};

export default TaskTimer;
