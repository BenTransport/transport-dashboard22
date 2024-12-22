import React from "react";
import { getAllPartners } from "@/actions/partner.action";
import { Offers } from "@/components/offers";
import { getAllOffers } from "@/actions/offer.action";
import { getAllBookings } from "@/actions/booking.action";
import { Booking } from "@/components/booking";

const BookingMain = async ({
    searchParams,
}: {
    searchParams: { page?: number; limit?: number; query?: string };
}) => {
    const { error, data, meta } = await getAllBookings({
        page: searchParams.page,
        limit: searchParams.limit,
        query: searchParams.query,
    });
    return <Booking data={data || []} meta={meta || {}} />;
};

export default BookingMain;
