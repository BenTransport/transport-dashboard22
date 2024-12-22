import React from "react";
import { getAllWorkWithUsEntries } from "@/actions/work.action";
import { WorkWithUs } from "@/components/work";

const Work = async ({
    searchParams,
}: {
    searchParams: { page?: number; limit?: number; query?: string };
}) => {
    const { error, data, meta } = await getAllWorkWithUsEntries({
        page: searchParams.page,
        limit: searchParams.limit,
        query: searchParams.query,
    });
    return <WorkWithUs data={data || []} meta={meta || {}} />;
};

export default Work;
