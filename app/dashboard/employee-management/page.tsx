import React from "react";
import { getAllUsers } from "@/actions/user.action";
import { EmployeeWork } from "@/components/EmployeeWork";

const MainEmployeeWork = async ({
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
    return <EmployeeWork data={data?.users || []} meta={meta || {}} />;
};

export default MainEmployeeWork;
