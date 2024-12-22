import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
  Badge,
} from "@nextui-org/react";
import React from "react";
import { BellRing } from "lucide-react";


export const NotificationsDropdown = () => {

  // Notifications array
  const notifications = [
    {
      id: 1,
      title: "📣 Edit your information",
      description:
        "Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    },
    {
      id: 2,
      title: "🚀 Say goodbye to paper receipts!",
      description:
        "Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    },
    {
      id: 3,
      title: "📣 Update your profile picture",
      description:
        "Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    },
  ];

  // Notification count
  const notificationCount = notifications.length;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem>
          <Badge
            content={notificationCount}
            // color="primary"
            placement="top-right"
            shape="circle"
            className="bg-[#05549F] text-white text-xs p-[2px]"
          >
            <BellRing className="text-gray-600 dark:text-gray-300  cursor-pointer h-6 w-6" />
          </Badge>
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Notifications">
        <DropdownSection title="Notifications">
          {/* Map through notifications array */}
          {notifications.map((notification) => (
            <DropdownItem
              key={notification.id}
              classNames={{
                base: "py-2",
                title: "text-base font-semibold",
              }}
              description={notification.description}
            >
              {notification.title}
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
