"use client";

import React, { useState } from "react";
import TagInput from "./TagInput";

function AddEditNotes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-label" htmlFor="">
          TITLE
        </label>
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
          type="text"
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
        <button className="bg-blue-500 font-small   w-full" onClick={() => {}}>
          ADD
        </button>
      </div>
    </div>
  );
}

export default AddEditNotes;
