"use client";

import PasswordInput from "@/components/Passwordinput";
import { validateEmail } from "@/utils/helper";
import Link from "next/link";
import React, { useState } from "react";

function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");

    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    // Signup API Call 
      try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        router.push("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-4">
      <form
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm flex flex-col gap-6"
        onSubmit={submitHandler}
      >
        <h4 className="text-xl font-semibold text-gray-800 text-center">Sign Up</h4>

        {/* Name Input */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-400 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email Input */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-400 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password Input (with show/hide from your component) */}
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        {/* Submit Button */}
        <button
          className="bg-black hover:bg-gray-800 text-white text-sm font-medium py-2 rounded transition-all cursor-pointer"
          type="submit"
        >
          Sign Up
        </button>

        {/* Redirect Link */}
        <div className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:underline" href="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Page;
