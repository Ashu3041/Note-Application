"use client";
import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

function NavBar({ userInfo }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  const router = useRouter();
  const onLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between w-full text-white font-medium">
      <div className="text-black pl-3 font-bold">NoteWise</div>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
}

export default NavBar;

