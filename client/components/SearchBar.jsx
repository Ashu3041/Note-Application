import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
    <div className='w-80 flex items-center px-3 py-2 border-[1.5px] border-amber-400 rounded gap-2'>
      <input type="text" 
      placeholder='Search Note Here'
      className='w-full text-black bg-transparent py[11px] outline-2 '
      value={value} 
      onChange={onChange}
      
      />
      {value && <IoMdClose className='text-gray-400 cursor-pointer  hover:text-black' onClick={onClearSearch}/>}
      <FaMagnifyingGlass className='text-gray-400 cursor-pointer hover:text-black' onClick={handleSearch}/>
      
    </div>
  )
}

export default SearchBar
