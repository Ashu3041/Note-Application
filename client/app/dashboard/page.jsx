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
import Toast from "@/components/Toast";
import EmptyCard from "@/components/EmptyCard";
import AddNotesImg from "@/public/add-button.png";
import noDataImg from "@/public/noDataImg.svg";

Modal.setAppElement("body");

function Page() {
  const [openAddEditNotes, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  //USE STATE

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const router = useRouter();

  //Handle EDIT
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  //Handle Close
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  //Handle Toast

  const showToastMessage = (message, type = "add") => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  //GET USER INFO

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      console.log("user", response.user);
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        router.push("/login");
      }
    }
  };

  //GET ALL Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An Unexpected Error Occured. Please Try Again.");
    }
  };

  //DELETE NOTE

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Sucessfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An Unexpected Error Occured. Please Try Again.");
      }
    }
  };

  //Search For A Note

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Handle Clear Search

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  // UPDATE PIN

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        `/update-note-pinned/${noteId}`,
        {
          isPinned: !noteData.isPinned,
        }
      );

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Sucessfully");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <NavBar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="min-h-screen p-6 bg-yellow-600">
        {/* All notes in one grid */}
        {allNotes.length > 0 ? (
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allNotes.map((item, index) => (
              <NoteCards
                key={item._id}
                title={item.title}
                date={moment(item.createdOn).format("Do MMM YYYY")}
                content={item.content}
                tags={item.tags}
                isPined={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? noDataImg : AddNotesImg}
            message={
              isSearch
                ? "Oops! No Notes Found Matching Your Search."
                : 'Start Creating Your First Note ! Click the "ADD" Button To NoteDown Your Thoughts, Ideas and Remember.Lets get Started'
            }
          />
        )}
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
        <AddEditNotes
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          noteData={openAddEditNotes.data}
          type={openAddEditNotes.type}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
}

export default Page;
