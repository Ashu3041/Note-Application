"use client";
import React, { useEffect, useState } from "react";
import TagInput from "./TagInput";
import axiosInstance from "@/utils/axiosInstance";

function AddEditNotes({ noteData,type,getAllNotes,onClose,showToastMessage }) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error,setError] = useState(null);


  useEffect(() => {
    if (noteData) {
      setTitle(noteData.title || "");
      setContent(noteData.content || "");
      setTags(noteData.tags || []);
    }
  }, [noteData]);


  //ADD NOTE
  const addNewNote = async ()=>{
    try{
      const response = await axiosInstance.post("/add-note",{
        title,
        content,
        tags,
      });

      if(response.data && response.data.note){
        showToastMessage("Note Added Sucessfully");
        getAllNotes();
        onClose();
      }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
    }
  }

  //EDIT NOTE
  const editNote = async()=>{
    const noteId=noteData._id;
      try{
      const response = await axiosInstance.put(`/edit-note/${noteId}`,{
        title,
        content,
        tags,
      });

      if(response.data && response.data.note){
        showToastMessage("Note Updated Sucessfully");
        getAllNotes();
        onClose();
      }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote= () =>{
  if(!title){
    setError("Please Enter the title");
    return;
  }

  if(!content){
    setError("Please Emter the Content");
    return;
  }

  setError('');

  if(type==='edit'){
    editNote();
  }else{
    addNewNote();
  }
};
  return (
    <div className="bg-red-400">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <label className="input-label" htmlFor="">
            TITLE
          </label>
          <span className="cursor-pointer text-red-500 text-lg" onClick={onClose}>
            ✕
          </span>
        </div>
        <input
          className="text-2xl text-slate-950 outline-none"
          type="text"
          placeholder="Write the Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label" htmlFor="">
          CONTENT
        </label>
        <textarea
          className="text-slate-950 outline-none h-40 w-full rounded-2xl border-2"
          placeholder="Write the Note..."
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label htmlFor="" className="input-label">
          TAGS
        </label>
        <TagInput tags={tags} setTags={setTags} /> 
      </div>

      <div>
        <button 
        className="bg-blue-500 text-white font-small w-full mt-4 py-2 rounded cursor-pointer"
        onClick={handleAddNote}
        >
          {type==='edit'?'UPDATE':'ADD'}
        </button>
      </div>
    </div>
  );
}

export default AddEditNotes;