"use client";
import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

function NavBar({ userInfo , onSearchNote ,handleClearSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();  

// On Handle Search
  
  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery);
    }
  };

//On Clear Search

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch("");
  };

// On Log Out
  const onLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between w-full text-white font-medium p-3 relative z-50">
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

