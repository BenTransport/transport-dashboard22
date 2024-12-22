import { Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { deleteUser, editUser } from "@/actions/user.action";
import { toast } from "sonner";
import { ChevronRight, ChevronRightCircle } from "lucide-react";
import Link from "next/link";

interface Props {
    item: any;
    isAdmin?: boolean

    columnKey: string | React.Key;
}

export const RenderCell = ({ item, columnKey, isAdmin }: Props) => {
    console.log("🚀 ~ RenderCell ~ item:", item)
    const cellValue = item[columnKey as keyof any];

    switch (columnKey) {
        case "email":
            return <div className="">{cellValue}</div>;

        case "full_name":
            return <div className="capitalize">{cellValue}</div>;
        case "hourRate":
            return <div className="capitalize">{cellValue} SEK</div>;
        case "tasks":
            return <div className="capitalize">{cellValue ? cellValue.length : 0}</div>;
        case "completed":
            return <div className="capitalize">{item.tasks && item.tasks.length > 0 ? item.tasks.filter((item: any) => item.status == "completed").length : 0}</div>;
        case "current":
            return <div className="capitalize">{item.currentTask.length > 0 && item.currentTask[0].title}</div>;
        case "start":
            return <div className="capitalize">{item.currentTask.length > 0 && item.currentTask[0].workingStartTime}</div>;

        case "type":
            return (
                <Chip
                    size="sm"
                    variant="flat"
                    color={
                        cellValue === "driver"
                            ? "success"
                            : cellValue === "helper"
                                ? "primary"
                                : "warning"
                    }
                >
                    <span className="text-xs">{cellValue}</span>
                </Chip>
            );
        case "isAvailable":
            return (
                <Chip
                    size="sm"
                    variant="flat"
                    color={
                        cellValue === "true"
                            ? "success"
                            : cellValue === "user"
                                ? "primary"
                                : "warning"
                    }
                >
                    <span className="text-xs">{cellValue == "true" ? "Available" : "Busy"}</span>
                </Chip>
            );

        case "actions":
            return (
                <div className="flex items-center gap-4">
                    <Link href={`/dashboard/employee-management/${item._id}`}>
                        <button className="flex items-center gap-x-1 justify-center">
                            View History <ChevronRight className="h-4 w-4 mt-1" />
                        </button>
                    </Link>
                </div >
            );

        default:
            return <div>{cellValue}</div>;
    }
};
