"use server"
import axiosInstance from "@/config/axios";



export async function getAllBookings({
    query,
    page,
    limit,
}: {
    query?: string;
    page?: number;
    limit?: number;
}) {
    try {
        const response = await axiosInstance.get("/api/booking", {
            params: { query, page, limit },
        });
        console.log(response.data)
        return { data: response.data.bookings, meta: response.data.meta };
    } catch (error: any) {
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Fetch booking failed";
        // console.error("Fetch users failed:", errorMessage);
        return { error: errorMessage };
    }
}

export async function deleteBooking(
    entryId: any
) {
    console.log("🚀 ~ entryId:", entryId)
    try {
        await axiosInstance.delete(`/api/booking/${entryId}`);

        return { data: { message: "booking deleted successfully" } };
    } catch (error: any) {
        console.log("🚀 ~ error:", error)
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Delete booking failed";
        // console.error("Delete user failed:", errorMessage);
        return { error: errorMessage };
    }
}