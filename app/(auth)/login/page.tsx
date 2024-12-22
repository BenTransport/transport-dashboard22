import React from "react";
import Auth from "@/components/auth/login";
const login = ({ searchParams }: { searchParams: { error?: string } }) => {
  return <Auth searchParams={searchParams} />;
};

export default login;
