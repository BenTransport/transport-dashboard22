import React from "react";
import { getAllPartners } from "@/actions/partner.action";
import { Offers } from "@/components/offers";
import { getAllOffers } from "@/actions/offer.action";

const OfferMain = async ({
    searchParams,
}: {
    searchParams: { page?: number; limit?: number; query?: string };
}) => {
    const { error, data, meta } = await getAllOffers({
        page: searchParams.page,
        limit: searchParams.limit,
        query: searchParams.query,
    });
    return <Offers data={data || []} meta={meta || {}} />;
};

export default OfferMain;
