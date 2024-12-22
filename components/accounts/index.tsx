"use client";
import React from "react";
import { TableWrapper } from "@/components/table/table";
import { IMeta, IUser } from "@/helpers/types";
import { RenderCell } from "./render-cell";
import UserModal from "./user-modal";
import { createUser } from "@/actions/user.action";
import { toast } from "sonner";
import useUpdateSearchParams from "../hooks/useUpdateSearchParams";
import { useCheckAdmin } from "../hooks/useCheckingAdmin";

export const Accounts = ({ data, meta }: { data: IUser[]; meta: IMeta; }) => {
  const { updateSearchParams } = useUpdateSearchParams();
  const { isAdmin } = useCheckAdmin()
  const columns = [
    { name: "Email", uid: "email" },
    { name: "Full Name", uid: "full_name" },
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
        loading: "Creating admin...",
        success: "Admin created successfully!",
        error: "Error creating admin.",
      }
    );
  };

  return (
    <div className=" px-4 my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <h3 className="text-2xl text-sky-900 regular-fontss font-semibold">All Admins</h3>
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <UserModal mode="Add" onConfirm={handleAddUser} />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper
          meta={meta}
          isAdmin={isAdmin}
          RenderCell={RenderCell}
          data={data}
          columns={columns}
        />
      </div>
    </div>
  );
};
