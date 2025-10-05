"use client";

import AddEditNotes from "@/components/AddEditNotes";
import NoteCards from "@/components/NoteCards";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";

Modal.setAppElement("body");

function Page() {
  const [openAddEditNotes, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <div className="min-h-screen p-6 bg-yellow-600">
        {/* All notes in one grid */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NoteCards
            title="Meeting a Friend"
            date="25 Nov"
            content="The person is very special."
            tags="#meeting"
            isPined={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          <NoteCards
            title="Grocery List"
            date="28 Nov"
            content="Buy fruits, milk, and snacks."
            tags="#personal"
            isPined={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          <NoteCards
            title="Project Meeting"
            date="30 Nov"
            content="Discuss timeline and next sprint deliverables."
            tags="#work"
            isPined={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
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
        <AddEditNotes />
      </Modal>
    </>
  );
}

export default Page;
