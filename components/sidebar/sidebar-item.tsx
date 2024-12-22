import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "../layout/layout-context";
import clsx from "clsx";

interface Props {
  title?: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          isActive
            ? "bg-emerald-500 text-white  "
            : "hover:bg-default-100",
          "flex gap-2 w-full min-h-[40px] h-full regular-font items-center px-3 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
        onClick={handleClick}
      >
        <span className="text-[15px]  dark:text-gray-300">
          {icon}
        </span>
        <span className={`${isActive ? "text-white " : "text-default-900 dark:text-gray-300"}`}>{title ? title : ""}</span>
      </div>
    </NextLink >
  );
};
