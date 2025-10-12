import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div
      className={`
        fixed z-50 top-20 right-6 transition-all duration-500 ease-in-out
        ${isShown ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}
      `}
    >
      <div
        className={`
          relative flex items-center gap-3 px-4 py-3 min-w-60
          bg-white/90 backdrop-blur-sm
          border-l-4 rounded-xl shadow-lg
          ${
            type === "delete"
              ? "border-red-500"
              : "border-green-500"
          }
        `}
      >
        {/* Icon Container */}
        <div
          className={`
            flex items-center justify-center w-10 h-10 rounded-full
            ${
              type === "delete"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }
          `}
        >
          {type === "delete" ? (
            <MdDeleteOutline className="text-xl" />
          ) : (
            <LuCheck className="text-xl" />
          )}
        </div>

        {/* Message */}
        <p className="text-sm font-medium text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
