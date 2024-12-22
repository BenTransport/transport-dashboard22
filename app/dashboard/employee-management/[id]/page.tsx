import { getUserHistory } from '@/actions/user.action'
import Error from '@/components/error'
import { History } from '@/components/History'
import React from 'react'

async function page({ params }: any) {
    console.log("🚀 ~ page ~ slug:", params)
    const id = params.id
    console.log("🚀 ~ page ~ id:", id)
    const { data, error } = await getUserHistory({ userId: id })
    if (error) return <Error error={error || "No History found"} />;

    return (
        <History data={data.data} error={error} />
    )
}

export default page