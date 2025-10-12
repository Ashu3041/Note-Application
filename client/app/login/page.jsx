"use client";

import Passwordinput from "@/components/Passwordinput";
import axiosInstance from "@/utils/axiosInstance";
import { validateEmail } from "@/utils/helper";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter a valid password");
      return;
    }

    setError("");

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
    <main className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back to{" "}
          <span className="text-blue-600 font-semibold">NoteWise</span>
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Log in to access your notes anytime, anywhere.
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={loginHandler}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <Passwordinput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-full transition cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Not registered yet?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Create an account
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

export default Page;
