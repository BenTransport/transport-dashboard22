"use client";
import React from "react";
import { TableWrapper } from "@/components/table/table";
import { useCheckAdmin } from "../hooks/useCheckingAdmin";
import { RenderCell } from "./render-cell";

export const Partner = ({ data, meta }: { data: any; meta: any; }) => {
  const { isAdmin } = useCheckAdmin()
  const columns = [
    { name: "Name", uid: "name" },
    { name: "Email", uid: "email" },
    { name: "Phone", uid: "phone" },
    { name: "Vehicle Number", uid: "vehicleNumber" },
    { name: "License Number", uid: "licenseNumber" },
    { name: "ACTIONS", uid: "actions" },
  ];



  return (
    <div className=" px-4 my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <h3 className="text-2xl text-sky-900  regular-fontss font-semibold">Partners Info</h3>
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
