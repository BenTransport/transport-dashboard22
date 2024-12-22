import { getAllTasks } from '@/actions/task.action'
import { getAllUsersWithOutPagination } from '@/actions/user.action'
import Task from '@/components/task'
import React from 'react'

async function page() {
    const { data: UsersData = [] } = await getAllUsersWithOutPagination()
    const { data } = await getAllTasks()
    console.log("🚀 ~ page ~ data:", data)

    return (
        <Task UsersData={UsersData} data={data} />
    )
}

export default page