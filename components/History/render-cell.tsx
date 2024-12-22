import { Tooltip, Chip } from "@nextui-org/react";
import React from "react";

interface Props {
  item: any; // The task data passed into the cell
  columnKey: string | React.Key;
  isAdmin?: boolean;
}

// Helper function to calculate time difference in minutes
function calculateTimeDiffInMinutes(startTime: string, endTime: string): number {
  if (!startTime || !endTime) return 0;

  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);

  const startTotal = startH * 60 + startM;
  const endTotal = endH * 60 + endM;

  return endTotal > startTotal ? endTotal - startTotal : 0;
}

// Helper function to format time in a readable way
function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs > 0 ? `${hrs}h ` : ""}${mins}m`.trim();
}

export const RenderCell = ({ item, columnKey, isAdmin }: Props) => {
  const task = item.Task || {};
  const hourRate = item.userId?.hourRate || 0;

  // Derived values
  const taskName = task.title || "N/A";
  const startTime = task.workingStartTime || "N/A";
  const endTime = task.workingEndTime || "N/A";

  const totalMinutes = calculateTimeDiffInMinutes(task.workingStartTime, task.workingEndTime);
  const totalTime = formatDuration(totalMinutes);
  const price = ((totalMinutes / 60) * hourRate).toFixed(2);

  switch (columnKey) {
    case "task_name":
      return <div className="capitalize">{taskName}</div>;

    case "start_time":
      return <div>{startTime}</div>;

    case "end_time":
      return <div>{endTime}</div>;

    case "total_time":
      return (
        <Chip size="sm" variant="flat" color="primary">
          {totalTime}
        </Chip>
      );

    case "price":
      return (
        <Chip size="sm" variant="flat" color="success">
          SEK {price}
        </Chip>
      );


    default:
      return <div>{task[columnKey as keyof typeof task] || "N/A"}</div>;
  }
};
