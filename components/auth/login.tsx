"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoginSchema, RegisterSchema } from "@/helpers/schemas"; // Assuming you have validation for signup
import { LoginFormType } from "@/helpers/types";
import { signIn } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';

function Auth({ searchParams }: { searchParams: { error?: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const initialLoginValues: LoginFormType = {
    email: "",
    password: "",
  };

  const handleLogin = useCallback(async (values: LoginFormType) => {
    setLoading(true);
    try {
      await signIn("credentials", { ...values });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const projectHighlights = [
    "Manage your team effortlessly.",
    "Assign and track daily tasks ",
    "Monitor activity",
  ];
  useEffect(() => {
    if (searchParams.error) {
      router.replace("/login");
      toast.error(searchParams.error);
    }
  }, [searchParams]);

  return (
    <section className="bg-white h-screen max-h-screen lg:overflow-y-hidden dark:bg-black flex items-center justify-center">
      <div className="grid grid-cols-1  lg:grid-cols-2 w-full">
        <div className="relative lg:h-screen flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img className="object-cover w-full h-full" src="/pexels-artempodrez-5025512.jpg" alt="" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
              <h3 className="text-4xl font-bold bold-font  text-white">
                We&lsquo;re excited to have you here.
              </h3>
              {/* <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                {projectHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-[#05549F] rounded-full">
                      <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className=" light-font text-white">{highlight}</span>
                  </li>
                ))}


              </ul> */}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 bg-white dark:bg-black sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="w-full xl:w-10/12 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold bold-font  leading-tight text-black dark:text-gray-200 sm:text-4xl">
              Login to your Account
            </h2>


            <Formik
              initialValues={initialLoginValues}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
            >
              {({ handleSubmit, isSubmitting }) => (
                <Form className="mt-8 space-y-6">

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
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        className="w-full py-4 light-font pl-4 pr-10 border border-gray-300 rounded-xl bg-white dark:bg-[#18181b] dark:border-black text-gray-700 dark:text-gray-400 dark:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex regular-font  justify-center gap-x-2 font-semibold items-center py-4 text-white bg-[#05549F] rounded-xl hover:opacity-90"
                  >
                    {isSubmitting ?
                      <>
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-[#05549F]"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                        Submitting...
                      </>
                      : "Log in"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Auth;
