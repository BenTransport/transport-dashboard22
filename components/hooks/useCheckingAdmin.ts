"use client";
import { useSession } from "next-auth/react";

export const useCheckAdmin = () => {
    const session = useSession();
    const isAdmin = session.data?.user?.type === "admin";
    const isHelper = session.data?.user?.type === "helper";
    const isDriver = session.data?.user?.type === "driver";
    const isCleaner = session.data?.user?.type === "cleaner";
    const userData = session.data
    return { isAdmin, userData, isHelper, isDriver, isCleaner };
}
