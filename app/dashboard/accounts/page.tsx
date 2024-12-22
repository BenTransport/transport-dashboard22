import React from "react";
import { Accounts } from "@/components/accounts";
import { getAllUsers } from "@/actions/user.action";
import Error from "@/components/error";
import { redirect } from "next/navigation";

const accounts = async ({
  searchParams,
}: {
  searchParams: { page?: number; limit?: number; query?: string };
}) => {
  const { error, data, meta } = await getAllUsers({
    page: searchParams.page,
    limit: searchParams.limit,
    query: searchParams.query,
  });
  if (error || !meta) return <Error error={error || "No Data found"} />;
  return <Accounts data={data?.users || []} meta={meta} />;
};

export default accounts;
