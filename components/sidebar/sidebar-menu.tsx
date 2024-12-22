import React from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const SidebarMenu = ({ title, children }: Props) => {
  return (
    <div className="flex gap-2 flex-col">
      <span className="text-xs font-semibold mb-3 text-[#0054a5]">{title}</span>
      {children}
    </div>
  );
};
