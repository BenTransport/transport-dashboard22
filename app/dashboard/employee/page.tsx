import React from "react";
import { getAllUsers } from "@/actions/user.action";
import { Employee } from "@/components/employee";

const MainEmployee = async ({
    searchParams,
}: {
    searchParams: { page?: number; limit?: number; query?: string };
}) => {
    const { error, data, meta } = await getAllUsers({
        page: searchParams.page,
        limit: searchParams.limit,
        query: searchParams.query,
        type: "allWithOutAdmin"
    });
    // if (error || !meta) return <Error error={error || "No Data found"} />;
    return <Employee data={data?.users || []} meta={meta || {}} />;
};

export default MainEmployee;
