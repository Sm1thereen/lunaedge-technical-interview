import React from "react";
import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const NameShema = zod.object({
  firstName: zod
    .string()
    .min(2)
    .max(12)
    .regex(/^[A-Za-z]+$/),
  lastName: zod
    .string()
    .min(2)
    .max(12)
    .regex(/^[A-Za-z]+$/),
});

export default function MainPage() {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NameShema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });
  return (
    <div>
      <div className="container mx-auto">
        <form action="" className="mx-auto">
          <div className="input-wrapper flex space-x-2 justify-center mt-5 gap-x-8">
            <div className="first-name-wrapper flex flex-col mb-4">
              <label htmlFor="">Name</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    width="24"
                    height="24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="firstName"
                  className="w-full h-10 rounded-md border-2 border-gray-300 pl-10 pr-4 py-3 
               hover:border-violet-500 focus:border-violet-500 focus:outline-none"
                  placeholder="Enter your name..."
                  {...register("firstName")}
                />
              </div>
              {errors.firstName && (
                <p className="text-red-600 text-center text-xs">
                  Please type a valid name.
                </p>
              )}
            </div>
            <div className="last-name-wrapper flex flex-col mb-4 mx-2 mx-auto ">
              <label htmlFor="">Last name</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    width="24"
                    height="24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="lastName"
                  className="w-full h-10 rounded-md border-2 border-gray-300 pl-10 pr-4 py-3 
               hover:border-violet-500 focus:border-violet-500 focus:outline-none"
                  placeholder="Enter your last name..."
                  {...register("lastName")}
                />
              </div>
              {errors.lastName && (
                <p className="text-red-600 text-center text-xs">
                  Please type a valid last name.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
