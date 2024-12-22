"use server";

import { cookies } from "next/headers";
import axiosInstance from "@/config/axios";
import { IUser, Result } from "@/helpers/types";



export async function deleteUser(
  userId: string
): Promise<Result<{ message: string }>> {
  try {
    await axiosInstance.delete(`/api/users/${userId}`);

    return { data: { message: "User deleted successfully" } };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Delete user failed";
    // console.error("Delete user failed:", errorMessage);
    return { error: errorMessage };
  }
}
export async function getAllUsersWithOutPagination() {
  try {
    const response = await axiosInstance.get("/api/users/user-without-pagination");
    console.log(response.data.body)
    return { data: response.data.body };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Fetch users failed";
    console.log("Fetch users failed:", error.response.data);
    return { error: errorMessage };
  }
}

export async function getUserById(
  id: string,
  page: number,
  limit: number,
) {
  try {
    const res = await axiosInstance.get(`/api/users/${id}`, {
      params: { page, limit },
    });

    const { timestamps } = res.data.body;
    const { meta } = res.data
    return { data: { timestamps, meta } };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Failed to get user timestamps";
    return { error: errorMessage };
  }
}

export async function editUser(
  userId: string,
  data: IUser
): Promise<Result<IUser>> {
  try {
    const response = await axiosInstance.put(`/api/users/${userId}`, data);

    return { data: response.data.body.updated_user };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Edit user failed";
    // console.error("Edit user failed:", errorMessage);
    return { error: errorMessage };
  }
}


export async function createUser(data: IUser): Promise<Result<IUser>> {
  try {
    const response = await axiosInstance.post("/api/users", {
      ...data,
      _id: null,
    });

    return { data: response.data.body.new_admin_user };
  } catch (error: any) {
    console.log("🚀 ~ createUser ~ error:", error)
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Create user failed";
    // console.error("Create user failed:", errorMessage);
    return { error: errorMessage };
  }
}


export async function getAllUsers({
  query,
  page,
  limit,
  type
}: {
  query?: string;
  page?: number;
  limit?: number;
  type?: string;
}): Promise<Result<{ users: IUser[] }>> {
  try {
    const response = await axiosInstance.get("/api/users", {
      params: { query, page, limit, type },
    });
    console.log(response.data.body)
    return { data: response.data.body, meta: response.data.meta };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Fetch users failed";
    // console.error("Fetch users failed:", errorMessage);
    return { error: errorMessage };
  }
}
export async function getUserHistory({ userId }: any) {
  try {
    const response = await axiosInstance.get(`/api/users/history/${userId}`);
    console.log("🚀 ~ getUserTasks ~ response:", response.data)
    return { data: response.data };
  } catch (error: any) {
    const errorMessage = error.response?.data.message || "Failed to fetch user tasks";
    console.log("Fetch user tasks failed:", errorMessage);
    return { error: errorMessage };
  }
}
export async function getUserHistoryToken() {
  try {
    const response = await axiosInstance.get(`/api/users/token`);
    console.log("🚀 ~ getUserTasks ~ response:", response.data)
    return { data: response.data };
  } catch (error: any) {
    const errorMessage = error.response?.data.message || "Failed to fetch user tasks";
    console.log("Fetch user tasks failed:", errorMessage);
    return { error: errorMessage };
  }
}
