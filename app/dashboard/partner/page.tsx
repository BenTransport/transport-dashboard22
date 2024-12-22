import React from "react";
import { getAllWorkWithUsEntries } from "@/actions/work.action";
import { WorkWithUs } from "@/components/work";
import { getAllPartners } from "@/actions/partner.action";
import { Partner } from "@/components/partners";

const PartnerMain = async ({
    searchParams,
}: {
    searchParams: { page?: number; limit?: number; query?: string };
}) => {
    const { error, data, meta } = await getAllPartners({
        page: searchParams.page,
        limit: searchParams.limit,
        query: searchParams.query,
    });
    return <Partner data={data || []} meta={meta || {}} />;
};

export default PartnerMain;
