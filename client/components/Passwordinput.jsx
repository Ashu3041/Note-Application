import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

function PasswordInput({ value, onChange, placeholder }) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);

  return (
    <div className="relative w-full">
      {/* Password input */}
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? 'text' : 'password'}
        placeholder={placeholder || 'Password'}
        className="w-full border border-gray-400 rounded px-3 py-2 pr-10 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Eye icon inside input (right side) */}
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-600"
        onClick={toggleShowPassword}
      >
        {isShowPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
      </div>
    </div>
  );
}

export default PasswordInput;
