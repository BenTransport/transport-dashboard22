import { getUserTasks } from '@/actions/task.action'
import Task from '@/components/task'
import Image from 'next/image'
import React from 'react'

async function page() {
    const { data, error } = await getUserTasks()

    if (data.length == 0) {
        return (
            <div className='h-[80vh] flex items-center justify-center flex-col gap-3 text-xl font-semibold '>
                <Image
                    src="/undraw_no_data_re_kwbl.svg"
                    alt='No task FOund'
                    height={100}
                    width={100}
                />
                No Task Found
            </div>
        )
    }
    return (
        <Task data={data} />
    )
}

export default page