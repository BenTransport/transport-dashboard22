"use client";
import React from "react";
import { ChevronDownIcon } from "../icons/sidebar/chevron-down-icon";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";
import { NotebookPen } from "lucide-react";


export const CollapseItems = () => {
  const bookingRoutes = [
    {
      name: "All Bookings",
      link: "/dashboard/bookings",

    },
    {
      name: "Add Booking",
      link: "/dashboard/bookings/create",
    },
  ]
  return (
    <div className="flex flex-col gap-4 w-full cursor-pointer">
      <Accordion className="px-0" defaultExpandedKeys={[]}>
        <AccordionItem
          key="accordion-1"
          indicator={<ChevronDownIcon />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5",
            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-2 regular-font">
              <span><NotebookPen /></span>
              <span>Booking</span>
            </div>
          }
        >
          <div className="pl-5">
            {bookingRoutes.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.link}
                  className={`w-full flex regular-font text-default-500 my-0.5  p-2 items-end gap-2 rounded-xl transition-colors capitalize ${false ? "bg-[#7828c8] text-white" : "hover:bg-slate-100 dark:hover:bg-slate-600 hover:text-default-900"}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
