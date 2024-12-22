import React, { useEffect, useState } from "react";
import { Sidebar } from "./sidebar.styles";
import CompanyCard from "./companyCard";
import NextLink from "next/link";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { routes } from "@/config/routes"; // Import the routes array
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { CollapseItems } from "./collapse-items";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [isShowIcon, setIsShowIcon] = useState(false)
  const session = useSession();
  const isAdmin = session.data?.user?.type === "admin";
  // const sheduled = [
  //   "Hubby Bday",
  //   "Sis Aniversary",
  //   "Bestie Wedding"
  // ]
  const currentPath = usePathname()
  return (
    <>
      {
        !isShowIcon ?
          <aside className="h-screen z-[200] sticky top-0 ">


            {collapsed ? (
              <div className={Sidebar.Overlay()} onClick={setCollapsed} />
            ) : null}
            <div
              className={Sidebar({
                collapsed: collapsed,
              })}
            >
              <div className={Sidebar.Header()}>
                <CompanyCard />

                {/* <div className="absolute right-1 top-1 hidden  cursor-pointer bg-white dark:bg-black  rounded-lg border p-0.5 md:flex items-center justify-center"
                  onClick={() => setIsShowIcon(!isShowIcon)}
                >
                <ChevronLeft />
              </div> */}
              </div>
              <div className="flex flex-col justify-between h-full">
                <div className={Sidebar.Body()} >
                  {routes
                    .filter((route) => route.admin === undefined || route.admin === isAdmin)
                    .map((route) => (
                      <SidebarItem
                        key={route.href}
                        title={route.title}
                        icon={<route.icon />}
                        isActive={pathname === route.href}
                        href={route.href}
                      />
                    ))}
                  {/* {
                    isAdmin &&
                    <CollapseItems />
                  } */}
                  {/* {routes.slice(4)
                    .filter((route) => route.admin === undefined || route.admin === isAdmin)
                    .map((route) => (
                      <SidebarItem
                        key={route.href}
                        title={route.title}
                        icon={<route.icon />}
                        isActive={pathname === route.href}
                        href={route.href}
                      />
                    ))} */}

                </div>
                <div className="flex flex-col w-full">

                  {/* <ul className="w-full mt-4 space-y-3 flex flex-col">

                <SidebarMenu title={"Scheduled Events"}
                >
                  {
                    sheduled.map((item: any, index: any) => (
                      <div className="flex gap-x-4 items-center" key={index}>
                        <span className="h-3 w-3 text-sm rounded-full bg-transparent border border-[#0054a5]">

                        </span>
                        <li className="text-sm light-font">
                          {item}
                        </li>
                      </div>
                    ))
                  }

                </SidebarMenu>
              </ul> */}

                  {/* <div className="w-full rounded-md p-1 group  cursor-pointer hover:bg-[#05549F] my-5 flex items-center">
                    <Image
                      src={"/user.jpeg"}
                      alt="user"
                      height={100}
                      width={100}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="text-base  font-semibold ml-2 text-[#05549F] group-hover:text-white regular-font">
                      Abdulla Lootah
                    </span>
                  </div> */}

                </div>
              </div>
            </div>
          </aside >

          :
          <aside className="h-screen z-[200] sticky top-0 w-20 bg-white dark:bg-black border-r  dark:border-r-gray-800">

            <div className=" relative flex flex-col items-center justify-between h-full ">
              <div className="absolute top-1 right-1 cursor-pointer bg-white dark:bg-black  rounded-lg border p-0.5 flex items-center justify-center"
                onClick={() => setIsShowIcon(!isShowIcon)}
              >
                <ChevronRight />
              </div>
              <div className="flex flex-col gap-y-2 items-center pt-8">

                <Link href="/dashboard">
                  <Image
                    src={"/logo.jpeg"}
                    alt="Company Logo"
                    width={100}
                    height={100}
                    className="h-auto w-10"
                  />
                </Link>
                <div className="flex flex-col  items-center">
                  <div className={Sidebar.Body()} >
                    {routes
                      .filter((route) => route.admin === undefined || route.admin === isAdmin)
                      .map((route, index: number) => (
                        <NextLink
                          key={index}
                          href={route.href}
                          className="text-default-900 active:bg-none max-w-full"
                        >
                          <div
                            className={clsx(
                              route.href == currentPath
                                ? "bg-[#05549F] text-white  "
                                : "hover:bg-default-100",
                              "flex gap-2 h-full regular-font items-center p-3 rounded-full cursor-pointer transition-all duration-150 active:scale-[0.98]"
                            )}
                          >
                            <span className="text-[15px]  dark:text-gray-300">
                              {<route.icon />}
                            </span>
                          </div>
                        </NextLink >

                      ))}

                  </div>
                </div>
              </div>



              {/* <Image
                src={"/user.jpeg"}
                alt="user"
                height={100}
                width={100}
                className="h-10 w-10 rounded-full object-cover pb-8"
              /> */}


            </div>
          </aside >
      }

    </>

  );
};
