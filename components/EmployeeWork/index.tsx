"use client";
import React, { useEffect, useState } from "react";
import { TableWrapper } from "@/components/table/table";
import { IMeta, IUser } from "@/helpers/types";
import { createUser } from "@/actions/user.action";
import { toast } from "sonner";
import useUpdateSearchParams from "../hooks/useUpdateSearchParams";
import { useCheckAdmin } from "../hooks/useCheckingAdmin";
import { RenderCell } from "./render-cell";
import { io } from "socket.io-client";


const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL)
export const EmployeeWork = ({ data, meta }: { data: IUser[]; meta: any; }) => {
    console.log("🚀 ~ EmployeeWork ~ data:", data)
    const [employeeData, setEmployeeData] = useState(data)
    useEffect(() => {
        setEmployeeData(data)
    }, [data])

    useEffect(() => {
        socket.on("availabilityUpdated", (update: { userId: string; isAvailable: string }) => {
            console.log(`User ${update.userId} updated availability to: ${update.isAvailable}`);

            setEmployeeData((prevData) =>
                prevData.map((user) =>
                    user._id === update.userId ? { ...user, isAvailable: update.isAvailable } : user
                )
            );
        });

        return () => {
            socket.off("availabilityUpdated");
        };
    }, []);
    const { isAdmin } = useCheckAdmin()
    const columns = [
        { name: "Full Name", uid: "full_name" },
        { name: "Phone Numer", uid: "phone_number" },
        { name: "Role", uid: "type" },
        { name: "Hourly Rate", uid: "hourRate" },
        { name: "Avalibility", uid: "isAvailable" },
        { name: "Total Task Assign", uid: "tasks" },
        { name: "Completed Tasks", uid: "completed" },
        { name: "Current Working Task", uid: "current" },
        { name: "Start Working at", uid: "start" },
        { name: "ACTIONS", uid: "actions" },
    ];
    return (
        <div className=" px-4 my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                    <h3 className="text-2xl text-sky-900 regular-fontss font-semibold">Employees Work Management</h3>
                </div>

            </div>
            <div className="max-w-[95rem] mx-auto w-full">
                <TableWrapper
                    meta={meta}
                    isAdmin={isAdmin}
                    RenderCell={RenderCell}
                    data={employeeData}
                    columns={columns}
                />
            </div>
        </div>
    );
};
