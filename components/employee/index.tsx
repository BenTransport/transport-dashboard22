"use client";
import React, { useEffect, useState } from "react";
import { TableWrapper } from "@/components/table/table";
import { IMeta, IUser } from "@/helpers/types";
import { createUser } from "@/actions/user.action";
import { toast } from "sonner";
import useUpdateSearchParams from "../hooks/useUpdateSearchParams";
import { useCheckAdmin } from "../hooks/useCheckingAdmin";
import EmployeeModel from "./user-modal";
import { RenderCell } from "./render-cell";
import { io } from "socket.io-client";


const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL)
export const Employee = ({ data, meta }: { data: IUser[]; meta: any; }) => {
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
    { name: "Email", uid: "email" },
    { name: "Full Name", uid: "full_name" },
    { name: "Hourly Rate", uid: "hourRate" },
    { name: "Phone Numer", uid: "phone_number" },
    { name: "Avalibility", uid: "isAvailable" },
    { name: "Joining Date", uid: "createdAt" },
    { name: "Role", uid: "type" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleAddUser = async (_: string, data: IUser) => {
    toast.promise(
      createUser(data).then((result) => {
        if (result.error) {
          toast.success(result.error)
          throw new Error(result.error);
        }
        return result;
      }),
      {
        loading: "Creating Employee...",
        success: "Employee created successfully!",
        error: "Error creating Employee.",
      }
    );
  };

  return (
    <div className=" px-4 my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <h3 className="text-2xl text-sky-900 regular-fontss font-semibold">All Employees</h3>
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <EmployeeModel mode="Add" onConfirm={handleAddUser} />
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
