import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import axiosInstance from "@/config/axios";
import axios from "axios";

export const UserDropdown = () => {
  const session = useSession();
  const router = useRouter();

  const getAvatarInitial = () => {
    if (session.data?.user) {
      const { name, email, image, type } = session.data.user;
      return name
        ? name.charAt(0).toUpperCase()
        : email?.charAt(0).toUpperCase();
    }
    return "U";
  };

  const handleLogout = useCallback(async () => {
    try {
      const userId = session.data?.user?.id;
      // const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/sign-out`, { id: userId });
      // console.log("🚀 ~ handleLogout ~ res:", res)

      await signOut({ redirect: false });
      router.replace("/login");
    } catch (error) {
      console.log("🚀 ~ handleLogout ~ error:", error);
    }
  }, [router]);

  const profileHandler = () => {
    router.push("/dashboard/profile")
  }
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger >
          <Avatar
            as="button"
            color="primary"
            size="md"
            src={`${session.data?.user ? session.data.user.image : "/user.jpeg"}`}
            className="rounded-full object-cover ml-7"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >

        <DropdownItem key="settings"
          onPress={profileHandler}
        >My Profile</DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onPress={handleLogout}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
