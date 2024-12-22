import Register from '@/components/auth/register'
import MainLoader from '@/components/Loader/MainLoader';
import React from 'react'
import { redirect } from 'next/navigation';
async function page({
    searchParams,
}: {
    searchParams: { invite?: number };
}) {

    return (

        <Register  />
    )
}

export default page