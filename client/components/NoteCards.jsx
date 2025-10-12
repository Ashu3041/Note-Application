"use client";

import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags = [],
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="relative border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out w-full">
      
      {/* 📌 Pin Icon */}
      <button
        onClick={onPinNote}
        className="absolute top-3 right-3 text-xl text-gray-400 hover:text-blue-600 transition-colors"
        aria-label={isPinned ? "Unpin note" : "Pin note"}
      >
        <MdOutlinePushPin
          className={`${isPinned ? "text-blue-600" : "text-gray-400"}`}
        />
      </button>

      {/* 📝 Title & Date */}
      <h6 className="text-lg font-semibold text-gray-900 pr-8 line-clamp-1">
        {title}
      </h6>
      <span className="text-xs text-gray-500">{date}</span>

      {/* 📄 Content Preview */}
      <p className="text-sm text-gray-700 mt-2 line-clamp-3">
        {content || "No content available."}
      </p>

      {/* 🏷️ Tags & Actions */}
      <div className="flex items-center justify-between mt-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 text-xs text-blue-600 font-medium">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="text-gray-400">No tags</span>
          )}
        </div>

        {/* Edit & Delete Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-500 hover:text-blue-600 transition"
            aria-label="Edit note"
          >
            <MdCreate className="text-lg" />
          </button>

          <button
            onClick={onDelete}
            className="p-1.5 text-gray-500 hover:text-red-500 transition"
            aria-label="Delete note"
          >
            <MdDelete className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
