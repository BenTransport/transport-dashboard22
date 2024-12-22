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
import { BellRing, MessagesSquare } from "lucide-react";

export const MessageDropDown = () => {

    // Notifications array
    const notifications = [
        {
            id: 1,
            title: "📣 Edit your information",

        },
        {
            id: 2,
            title: "🚀 Say goodbye to paper receipts!",

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
                        size="md"
                        placement="top-right"
                        className="bg-[#05549F] text-white text-xs p-[2px]"

                        shape="circle"
                    >
                        <MessagesSquare className="text-gray-600 dark:text-gray-300 cursor-pointer h-6 w-6" />
                    </Badge>
                </NavbarItem>
            </DropdownTrigger>
            <DropdownMenu className="w-80" aria-label="Notifications">
                <DropdownSection title="Messages">
                    {notifications.map((notification) => (
                        <DropdownItem
                            key={notification.id}
                            classNames={{
                                base: "py-2",
                                title: "text-base font-semibold",
                            }}
                        // description={notification.description}
                        >
                            {notification.title}
                        </DropdownItem>
                    ))}
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}