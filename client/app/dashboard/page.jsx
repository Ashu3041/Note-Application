"use client";

import AddEditNotes from "@/components/AddEditNotes";
import NoteCards from "@/components/NoteCards";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import NavBar from "@/components/NavBar";
import moment from "moment";


Modal.setAppElement("body");

function Page() {
  const [openAddEditNotes, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allNotes,setAllNotes] = useState([]);
  const [userInfo,setUserInfo] = useState(null);
  console.log("user data", userInfo)

  const router = useRouter();

  const handleEdit = (noteDetails)=>{
    setOpenAddEditModal({ isShown:true, data: noteDetails, type:"edit" });
  };

  //GET USER INFO

  const getUserInfo = async () =>{
    try{
      const response = await axiosInstance.get("/get-user");
      console.log("user", response.user)
      if (response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    }catch(error){
      if(error.response.status === 401){
        localStorage.clear();
        router.push("/login");
      }
    }
  };


  //GET ALL Notes
  const getAllNotes = async () =>{
    try{
      const response = await axiosInstance.get("/get-all-notes");

      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
    }catch(error){
      console.log("An Unexpected Error Occured. Please Try Again.")
    }
  }

  useEffect(()=>{
    getAllNotes();
    getUserInfo();
    return () => {};
  }, [] );

  return (
    <>
      <NavBar userInfo={userInfo} />
      <div className="min-h-screen p-6 bg-yellow-600">
        {/* All notes in one grid */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNotes.map((item,index)=>(
            <NoteCards
            key={item._id}
            title={item.title}
            date={moment(item.createdOn).format("Do MMM YYYY")}
            content={item.content}
            tags={item.tags}
            isPined={item.isPinned}
            onEdit={() => handleEdit(item)}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-10 right-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-3xl" />
      </button>

      {/* Modal */}
      <Modal
        isOpen={openAddEditNotes.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[90%] sm:w-[60%] md:w-[40%] bg-white rounded-md mx-auto mt-20 p-5 overflow-auto"
      >
        <AddEditNotes   onClose={() => 
          setOpenAddEditModal({isShown: false, type: "add", data: null})}
          getAllNotes={getAllNotes}
          noteData={openAddEditNotes.data}
          type={openAddEditNotes.type}
          />
      </Modal>
    </>
  );
}

export default Page;
