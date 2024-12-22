import { getUserHistory, getUserHistoryToken } from '@/actions/user.action'
import Error from '@/components/error'
import { History } from '@/components/History'
import React from 'react'

async function page() {
    const { data, error } = await getUserHistoryToken()
    if (error) return <Error error={error || "No History found"} />;

    return (
        <History data={data.data} error={error} />
    )
}

export default page