"use client"

import React from 'react';
import {
    LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const UserRegistrationsChart = ({ data }) => {
    const months = [
        '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    // Prepare chart data
    const chartData = Array.from({ length: 12 }, (_, index) => {
        const monthNumber = index + 1;
        const monthData = data.find((item) => item._id === monthNumber);
        return {
            month: months[monthNumber],
            registrations: monthData ? monthData.count : 0,
        };
    });

    return (

        <div className='p-4  w-11/12 mx-auto bg-sky-50 my-8 h-[450px] rounded-2xl'>
            < h2 className='text-center text-2xl  sm:text-4xl text-sky-900 font-semibold sm:font-bold mb-9' > Employee  created Over the Past Year</h2>
            <div className='h-[340px]'>

                <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="registrations" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div >
        </div >
    );
};

export default UserRegistrationsChart;
