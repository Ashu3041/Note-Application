"use client";
import Passwordinput from "@/components/Passwordinput";
import { validateEmail } from "@/utils/helper";
import Link from "next/link";
import React from "react";
import { useState } from "react";

function page() {


  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);


  const loginHandler = async (e) => {
    e.preventDefault();
    console.log("submit");

    if(!validateEmail(email)){
      setError("Please enter a valid email");
      return;
    }

    if(!password){
      setError("Please enter a valid password");
      return;
    }
    setError("")

    // Login API Call
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200 gap-8">
        <form 
        className="bg-white h-100 w-80 flex flex-col items-center justify-center gap-12" 
        onSubmit={loginHandler}
        >
          <h4>Login</h4>
          <div className="flex flex-col gap-4 items-center justify-center">
            <input type="text" 
            className='flex items-center bg bg-transparent border-[1.5px] border-gray-400 rounded px-7.5 py-2.5 gap-2' 
            placeholder="Email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <Passwordinput value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
          
          </div>
          <button 
          className="bg-black text-white text-sm pl-4 pt-1.5 pb-1.5 pr-4 rounded" 
          type="submit">
            Login
          </button>
          <div>Not registered yet? <Link href="/signup" className="text-blue-600 underline">Create an Account</Link></div>
        </form>
      </div>
    </div>
  );
}

export default page;
