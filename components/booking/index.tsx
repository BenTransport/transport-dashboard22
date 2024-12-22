"use client";
import React from "react";
import { TableWrapper } from "@/components/table/table";
import { useCheckAdmin } from "../hooks/useCheckingAdmin";
import { RenderCell } from "./render-cell";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export const Booking = ({ data, meta }: { data: any; meta: any; }) => {
  const { isAdmin } = useCheckAdmin()
  const columns = [
    { name: "Name", uid: "name" },
    { name: "Phone", uid: "phone" },
    { name: "Date", uid: "date" },
    { name: "Time", uid: "time" },
    { name: "Services", uid: "selectedServices" },
    { name: "Total Cost", uid: "totalCost" },
    { name: "ACTIONS", uid: "actions" },
  ];



  return (
    <div className=" px-4 my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap justify-between w-full">
          <h3 className="text-2xl text-sky-900 regular-fontss font-semibold">Bookings Info</h3>
          <Link href={"/dashboard/bookings/create"}>
            <Button className="bg-emerald-500 text-white">
              Add New Booking
            </Button>
          </Link>
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
