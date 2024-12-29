"use client";
import React from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { registrationSchema } from "../../utils/validations";
import { toast } from "react-toastify";

const Register = () => {
  const { values, handleSubmit, handleChange, errors, isSubmitting } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: registrationSchema,
      onSubmit: async (values, { setSubmitting }) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }
          );

          const data = await response.json();
          console.log("Registration successful:", data);

          if (response.ok) {
            toast.success("Registration successful👍👍👍");
          } else {
            toast.error(data.message || "Something went wrong");
          }
        } catch (error) {
          console.error("Registration failed:", error);
          toast.error(error.message || "Something went wrong");
        } finally {
          setSubmitting(false);
        }
      },
    });

  return (
    <div className="flex justify-center items-center w-[100%] h-full">
      <div className="flex flex-col gap-5 w-[400px]">
        <h1 className="text-4xl mb-4 font-bold text-center">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            className="border-2 p-2"
            placeholder="Full Name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && (
            <div className="text-red-500 text-sm">{errors.name}</div>
          )}

          <input
            type="email"
            name="email"
            className="border-2 p-2"
            placeholder="Email ID"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          <input
            type="password"
            name="password"
            className="border-2 p-2"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}

          <button
            type="submit"
            className="p-2 bg-blue-700 text-white font-bold hover:bg-blue-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign up to continue"}
          </button>
        </form>
        <div className="text-center mt-2">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500 hover:underline">Login here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
