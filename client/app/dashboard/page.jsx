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
import { motion } from "framer-motion";
import { col } from "framer-motion/client";

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
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const router = useRouter();

  // ✅ Edit Note
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // ✅ Toast Close
  const handleCloseToast = () => {
    setShowToastMsg({ isShown: false, message: "" });
  };

  // ✅ Show Toast
  const showToastMessage = (message, type = "add") => {
    setShowToastMsg({ isShown: true, message, type });
  };

  // ✅ Fetch User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        router.push("/login");
      }
    }
  };

  // ✅ Fetch Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // ✅ Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      if (response.data && !response.data.error) {
        showToastMessage("Note deleted successfully", "delete");
        getAllNotes();
      }
    } catch {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // ✅ Search Notes
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

  // ✅ Clear Search
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  // ✅ Toggle Pin
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
        showToastMessage("Note updated successfully");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <NavBar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <main className="min-h-screen bg-gray-50 px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Your <span className="text-blue-600">Notes</span>
          </h2>
          <p className="text-gray-500">
            Capture ideas, organize your thoughts, and stay productive.
          </p>
        </motion.div>

        {/* Notes Section */}
        <div className="max-w-6xl mx-auto">
          {allNotes.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {allNotes.map((item) => (
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
            </motion.div>
          ) : (
            <EmptyCard
              imgSrc={isSearch ? noDataImg : AddNotesImg}
              message={
                isSearch
                  ? "Oops! No notes found matching your search."
                  : 'Start creating your first note! Click the "+" button below to jot down your thoughts and ideas.'
              }
            />
          )}
        </div>
      </main>

      {/* Floating Add Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-3xl" />
      </motion.button>

      {/* Modal */}
      <Modal
        isOpen={openAddEditNotes.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 50, // <-- ensure it's above other elements when open
            paddingTop: 190,
           
          },
          content: {
            zIndex: 60, // <-- bring modal content above overlay
            inset: "unset", // allow centering
            margin: "auto",
            maxHeight: "90vh",  
            overflow: "auto",
          },
        }}
        contentLabel=""
        className="w-[90%] sm:w-[60%] md:w-[40%] bg-white rounded-2xl mx-auto mt-20 p-6 shadow-lg focus:outline-none overflow-auto"
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

      {/* Toast */}
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
