"use client";
import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "../utils/validations";
import Link from "next/link";
import { toast } from "react-toastify";

const Home = () => {
  const { values, handleSubmit, handleChange, errors, isSubmitting } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values, { setSubmitting }) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }
          );

          const data = await response.json();
          console.log("Login successful:", data);
          if (response.ok) {
            localStorage.setItem("token", data?.token);
            toast.success("Login successful👍👍👍");
          } else {
            toast.error(data.message || "Something went wrong");
          }
        } catch (error) {
          console.error("Login failed:", error);
          toast.error(error.message || "Something went wrong");
        } finally {
          setSubmitting(false);
        }
      },
    });

  return (
    <div className="flex justify-center items-center w-[100%] h-full">
      <div className="flex flex-col gap-5 w-[400px]">
        <h1 className="text-4xl mb-4 font-bold">Welcome to To-do app</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
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
            {isSubmitting ? "Signing in..." : "Sign in to continue"}
          </button>
        </form>
        <div className="text-center mt-2">
          Don't have an account?{" "}
          <Link href="/register">
            <span className="text-blue-500 hover:underline">Register here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
