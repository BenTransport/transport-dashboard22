"use server"

import axiosInstance from "@/config/axios";


// 1. Create Task
export async function createTask(taskData: any) {
    try {
        const response = await axiosInstance.post("/api/tasks", taskData);
        return { data: response.data };
    } catch (error: any) {
        console.log("🚀 ~ createTask ~ error:", error.response.data)
        const errorMessage = error.response?.data?.message || "Failed to create task";
        console.error("Create task failed:", errorMessage);
        return { error: errorMessage };
    }
}

// 2. Get User Tasks
export async function getUserTasks() {
    try {
        const response = await axiosInstance.get(`/api/tasks/user`);
        console.log("🚀 ~ getUserTasks ~ response:", response.data)
        return { data: response.data };
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Failed to fetch user tasks";
        console.error("Fetch user tasks failed:", errorMessage);
        return { error: errorMessage };
    }
}
export async function getAllTasks() {
    try {
        const response = await axiosInstance.get(`/api/tasks`);
        return { data: response.data };
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Failed to fetch  tasks";
        console.error("Fetch user tasks failed:", errorMessage);
        return { error: errorMessage };
    }
}

// 3. Update Task Status
export async function updateTaskStatus(taskId: any, userIds: any) {
    console.log("🚀 ~ updateTaskStatus ~ status:", userIds)
    console.log("🚀 ~ updateTaskStatus ~ taskId:", taskId)
    try {
        const response = await axiosInstance.put(`/api/tasks/${taskId}/status`, { userIds });
        return { data: response.data };
    } catch (error: any) {
        console.log("🚀 ~ updateTaskStatus ~ error:", error)
        const errorMessage = error.response?.data?.error || "Failed to update task status";
        console.error("Update task status failed:", errorMessage);
        return { error: errorMessage };
    }
}
export async function updateTaskTime(taskId: any, updatePayload: any) {
    console.log("🚀 ~ updateTaskTime ~ updatePayload:", updatePayload)
    console.log("🚀 ~ updateTaskStatus ~ taskId:", taskId)
    const payload: any = {}
    if (updatePayload.startTime) {
        payload.startTime = updatePayload.startTime
    }
    if (updatePayload.EndTime) {
        payload.EndTime = updatePayload.EndTime
    }
    console.log("🚀 ~ updateTaskTime ~ payload:", payload)
    console.log("🚀 ~ updateTaskTime ~ taskId:", taskId)

    try {
        const response = await axiosInstance.put(`/api/tasks/time/${taskId}`, payload);
        return { data: response.data };
    } catch (error: any) {
        console.log("🚀 ~ updateTaskStatus ~ error:", error)
        const errorMessage = error.response?.data?.error || "Failed to update task status";
        console.error("Update task status failed:", errorMessage);
        return { error: errorMessage };
    }
}

// 4. Delete Task
export async function deleteTask(taskId: any) {
    try {
        const response = await axiosInstance.delete(`/api/tasks/${taskId}`);
        return { data: response.data };
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Failed to delete task";
        console.error("Delete task failed:", errorMessage);
        return { error: errorMessage };
    }
}

// 5. Get Task by ID
export async function getTaskById(taskId: any) {
    try {
        const response = await axiosInstance.get(`/api/tasks/${taskId}`);
        return { data: response.data };
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Failed to fetch task";
        console.error("Fetch task failed:", errorMessage);
        return { error: errorMessage };
    }
}
