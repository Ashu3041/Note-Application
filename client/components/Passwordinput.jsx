"use client";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function PasswordInput({ value, onChange, placeholder = "Enter your password", name }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      {/* Password Field */}
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="w-full border border-gray-400 rounded-4xl px-3 py-2 pr-10 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      />

      {/* Eye Icon */}
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
      </button>
    </div>
  );
}

export default PasswordInput;
