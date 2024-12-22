"use server"
import axiosInstance from "@/config/axios";



export async function getAllWorkWithUsEntries({
    query,
    page,
    limit,
}: {
    query?: string;
    page?: number;
    limit?: number;
}) {
    try {
        const response = await axiosInstance.get("/api/work-with-us", {
            params: { query, page, limit },
        });

        return { data: response.data.entries, meta: response.data.meta };
    } catch (error: any) {
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Fetch work failed";
        // console.error("Fetch users failed:", errorMessage);
        return { error: errorMessage };
    }
}

export async function deleteWorkWithUsEntry(
    entryId: any
) {
    console.log("🚀 ~ entryId:", entryId)
    try {
        await axiosInstance.delete(`/api/work-with-us/${entryId}`);

        return { data: { message: "Entry deleted successfully" } };
    } catch (error: any) {
        console.log("🚀 ~ error:", error)
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Delete entry failed";
        // console.error("Delete user failed:", errorMessage);
        return { error: errorMessage };
    }
}