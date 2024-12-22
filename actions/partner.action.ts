"use server"
import axiosInstance from "@/config/axios";



export async function getAllPartners({
    query,
    page,
    limit,
}: {
    query?: string;
    page?: number;
    limit?: number;
}) {
    try {
        const response = await axiosInstance.get("/api/partner", {
            params: { query, page, limit },
        });
        console.log(response.data)
        return { data: response.data.partners, meta: response.data.meta };
    } catch (error: any) {
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Fetch partners failed";
        // console.error("Fetch users failed:", errorMessage);
        return { error: errorMessage };
    }
}

export async function deletePartner(
    entryId: any
) {
    console.log("🚀 ~ entryId:", entryId)
    try {
        await axiosInstance.delete(`/api/partner/${entryId}`);

        return { data: { message: "partner deleted successfully" } };
    } catch (error: any) {
        console.log("🚀 ~ error:", error)
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Delete partner failed";
        // console.error("Delete user failed:", errorMessage);
        return { error: errorMessage };
    }
}