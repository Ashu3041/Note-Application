"use client";

import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCards = ({ title, date, content, tags, isPined, onEdit, onDelete, onPinNote }) => {
  return (
    <div className="relative border rounded-lg p-4 bg-white hover:shadow-xl transition-all ease-in-out w-full">
      {/* 📌 Pin icon at top right */}
      <MdOutlinePushPin
        className={`absolute top-3 right-3 text-xl cursor-pointer hover:text-blue-800 ${
          isPined ? "text-blue-600" : "text-slate-300"
        }`}
        onClick={onPinNote}
      />

      {/* Card Content */}
      <h6 className="text-lg font-semibold pr-6">{title}</h6>
      <span className="text-xs text-gray-500">{date}</span>
      <p className="text-sm text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-slate-500">{tags.map((item)=>`#${item}`)}</div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="cursor-pointer hover:text-green-500"
            onClick={onEdit}
          />
          <MdDelete
            className="cursor-pointer hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCards;
