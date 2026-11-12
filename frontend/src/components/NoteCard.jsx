import React from "react";
import { Trash2Icon, PenSquareIcon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils.js";
import toast from "react-hot-toast";

import api from "../lib/axios.js";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); //prevent going to NoteDetailPage of clicked note

    // options are - CANCEL->return  or OK ->continue to del
    if (!window.confirm("Are you sure you would like to delete this Note?"))
      return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id != id)); //updating for UI

      toast.success("Note Deleted Successfully");
    } catch (error) {
      console.log("Could note delete Note \n", error);
      toast.error("Note not Deleted");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hower-shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-base-content/60 text-md">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className=" flex items-center gap-1">
            <PenSquareIcon className="size-4 " />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => {
                handleDelete(e, note._id);
              }}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
