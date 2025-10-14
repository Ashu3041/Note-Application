import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div
      className="
    w-full sm:w-72 md:w-80 flex items-center gap-3
    bg-white/90 border border-amber-400/70
    rounded-xl px-3 py-2.5 shadow-sm
    focus-within:shadow-md
    transition-all duration-200
  "
    >
      {/* Input */}
      <input
        type="text"
        placeholder="Search notes..."
        className="
          w-full bg-transparent text-gray-800 placeholder-gray-400
          focus:outline-none text-sm sm:text-base
        "
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {/* Clear Button */}
      {value && (
        <IoMdClose
          className="
            text-gray-400 hover:text-red-500
            cursor-pointer transition-all duration-150
          "
          onClick={onClearSearch}
        />
      )}

      {/* Search Icon */}
      <FaMagnifyingGlass
        className="
          text-gray-500 hover:text-amber-500
          cursor-pointer transition-all duration-150 relative 
        "
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
