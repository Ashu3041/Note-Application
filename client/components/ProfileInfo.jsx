"use client";
import { getInitials } from "@/utils/helper";
import React from "react";

function ProfileInfo({ userInfo, onLogout }) {
  return (
    <div
      className="
        flex items-center gap-4 
        bg-white/80 border border-amber-300 rounded-2xl px-4 py-2
        shadow-sm hover:shadow-md transition-all duration-200
      "
    >
      {/* Avatar */}
      <div
        className="
          w-12 h-12 flex items-center justify-center 
          rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 
          text-white font-semibold text-lg
          shadow-md cursor-default select-none
        "
      >
        {getInitials(userInfo?.fullName)}
      </div>

      {/* User Info */}
      <div className="flex flex-col">
        <p className="text-gray-800 font-semibold text-base leading-tight">
          {userInfo?.fullName}
        </p>
        <button
          className="
            text-sm text-red-600 hover:text-red-700 
            underline underline-offset-2 
            transition-all duration-150 w-fit
          "
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
