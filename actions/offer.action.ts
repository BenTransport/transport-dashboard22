"use server"
import axiosInstance from "@/config/axios";



export async function getAllOffers({
    query,
    page,
    limit,
}: {
    query?: string;
    page?: number;
    limit?: number;
}) {
    try {
        const response = await axiosInstance.get("/api/offer", {
            params: { query, page, limit },
        });
        console.log(response.data)
        return { data: response.data.offers, meta: response.data.meta };
    } catch (error: any) {
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Fetch offer failed";
        // console.error("Fetch users failed:", errorMessage);
        return { error: errorMessage };
    }
}

export async function deleteOffer(
    entryId: any
) {
    console.log("🚀 ~ entryId:", entryId)
    try {
        await axiosInstance.delete(`/api/offer/${entryId}`);

        return { data: { message: "offer deleted successfully" } };
    } catch (error: any) {
        console.log("🚀 ~ error:", error)
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Delete offer failed";
        // console.error("Delete user failed:", errorMessage);
        return { error: errorMessage };
    }
}