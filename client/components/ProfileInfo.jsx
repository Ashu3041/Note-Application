"use client";
import { getInitials } from '@/utils/helper'
import React from 'react'

function ProfileInfo({userInfo,onLogout}) {
    console.log(getInitials(userInfo?.fullName))
  return (
    <div className='flex items-center gap-3'>
        <div 
        className='w-12 h-12 flex items-center justify-center rounded-full cursor-pointer text-slate-950 font-medium bg-slate-100'>
            {getInitials(userInfo?.fullName)}
            </div>
        <div> 
            <p className='text-black font-medium cursor-pointer'>
                {userInfo?.fullName}
                </p>
            <button className='text-sm text-red-700 underline cursor-pointer' onClick={onLogout}>
                Logout
            </button>

        </div>
    </div>
  )
}

export default ProfileInfo
