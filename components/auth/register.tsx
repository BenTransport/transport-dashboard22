"use client";
import React, { useState, useCallback, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RegisterSchema } from "@/helpers/schemas";
import { signIn } from 'next-auth/react';
import axios from 'axios';
import MainLoader from '../Loader/MainLoader';

function Register({ data, id }: any) {
    console.log("🚀 ~ Register ~ data:", data)
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showLoading, setShowLoading] = useState(true)
    const initialValues = {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        password: "",
        // signature: ""
    };

    const handleRegister = async (values: any) => {
        setLoading(true);
        const fullName = `${values.first_name} ${values.middle_name} ${values.last_name}`;
        const payload = {
            full_name: fullName,
            email: values.email,
            password: values.password,
            // signature: values.signature,
            invitedBy: id
        };
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, payload);
            if (response.data.success) {
                toast.success("Account created successfully");
                router.push("/login");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Error creating account");
        } finally {
            setLoading(false);
        }
    };


    const projectHighlights = [
        "Manage your team effortlessly.",
        "Assign and track daily tasks ",
        "Monitor activity",
    ];

    // if (showLoading) {
    //     return (
    //         <MainLoader />

    //     )
    // }
    return (
        <section className="bg-white dark:bg-black flex items-center justify-center">
            {/* <section className="bg-white h-screen max-h-screen lg:overflow-y-hidden"> */}
            <div className="grid grid-cols-1  lg:w-1/2 w-full">



                <div className="flex items-center justify-center px-5 py-4 xl:py-9 xl:pt-12 bg-white dark:bg-black sm:px-6 lg:px-8 ">
                    <div className="w-full xl:w-10/12 2xl:max-w-md xl:mx-auto">
                        <h2 className="text-3xl bold-font font-bold leading-tight text-black sm:text-4xl dark:text-gray-200">
                            Register your Account
                        </h2>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={RegisterSchema}
                            onSubmit={handleRegister}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-4 mt-20">
                                    <div className='flex gap-4 w-full flex-col lg:flex-row'>

                                        <div className="flex flex-col w-full lg:w-6/12">
                                            <label className="mb-1 light-font font-medium text-gray-500 dark:text-gray-300">First Name</label>
                                            <Field
                                                type="text"
                                                name="first_name"
                                                placeholder="Enter your First Name"
                                                className="w-full py-4 light-font pl-4 pr-4 border border-gray-300 rounded-xl bg-white dark:bg-[#18181b] dark:border-black text-gray-700 dark:text-gray-400 dark:outline-none"

                                            />
                                            <ErrorMessage name="first_name" component="div" className="text-red-600 text-sm mt-1" />
                                        </div>

                                        <div className="flex flex-col w-full lg:w-6/12">

                                            <label className="mb-1  light-font font-medium text-gray-500 dark:text-gray-300">Middle Name</label>
                                            <Field
                                                type="text"
                                                name="middle_name"
                                                placeholder="Enter your Middle Name"
                                                className="w-full py-4 light-font pl-4 pr-4 border border-gray-300 rounded-xl bg-white dark:bg-[#18181b] dark:border-black text-gray-700 dark:text-gray-400 dark:outline-none"

                                            />
                                            <ErrorMessage name="middle_name" component="div" className="text-red-600 text-sm mt-1" />
                                        </div>

                                    </div>
                                    <div className="flex flex-col">
                                        <label className="mb-1 light-font font-medium text-gray-500 dark:text-gray-300">Last Name</label>
                                        <Field
                                            type="text"
                                            name="last_name"
                                            placeholder="Enter your last name"
                                            className="w-full py-4 light-font pl-4 pr-4 border border-gray-300 rounded-xl bg-white dark:bg-[#18181b] dark:border-black text-gray-700 dark:text-gray-400 dark:outline-none"

                                        />
                                        <ErrorMessage name="last_name" component="div" className="text-red-600 text-sm mt-1" />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 light-font font-medium text-gray-500 dark:text-gray-300">Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            className="w-full py-4 light-font pl-4 pr-4 border border-gray-300 rounded-xl bg-white dark:bg-[#18181b] dark:border-black text-gray-700 dark:text-gray-400 dark:outline-none"

                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 light-font font-medium text-gray-500 dark:text-gray-300">Password</label>
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            className="w-full py-4 light-font pl-4 pr-4 border border-gray-300 rounded-xl bg-white dark:bg-[#18181b] dark:border-black text-gray-700 dark:text-gray-400 dark:outline-none"

                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                                    </div>

                                    {/* <div className="flex flex-col">
                                        <label className="mb-1 light-font font-medium text-gray-500">Signature</label>
                                        <Field
                                            type="text"
                                            name="signature"
                                            placeholder="Enter your signature"
                                                               className="w-full py-4 light-font pl-4 pr-4 border border-gray-300 rounded-xl bg-white dark:bg-[#18181b] dark:border-black text-gray-700 dark:text-gray-400 dark:outline-none"

                                        />
                                        <ErrorMessage name="signature" component="div" className="text-red-600 text-sm mt-1" />
                                    </div> */}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex regular-font  justify-center font-semibold items-center py-4 text-white bg-[#05549F] rounded-xl hover:opacity-90"
                                    >
                                        {isSubmitting ? "Registering..." : "Sign Up"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                {/* <div className="relative lg:min-h-screen flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
                    <div className="absolute inset-0">
                        <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/4/girl-working-on-laptop.jpg" alt="" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="relative">
                        <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                            <h3 className="text-4xl bold-font font-bold text-white leading-10">
                                Join Us Today! <br className="hidden xl:block" />
                                Let&apos;s get you started on your journey.
                            </h3>

                            <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                                {projectHighlights.map((highlight, index) => (
                                    <li key={index} className="flex items-center space-x-3">
                                        <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-[#05549F] rounded-full">
                                            <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className=" text-white light-font">{highlight}</span>
                                    </li>
                                ))}


                            </ul>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    );
}

export default Register;
