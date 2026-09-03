import React from "react";

const NoteCard = ({ note, deleteNote, noteForUpdate }) => {
  return (
    <div className="w-full sm:w-[48%] lg:w-[30%] bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-md hover:border-gray-700 transition">
      {/* Note Content */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-white mb-2">{note.title}</h1>

        <p className="text-sm text-gray-400 leading-6">
          {note.description.length > 20
            ? note.description.substring(0, 20) + "..."
            : note.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-gray-800 pt-4">
        <button
          onClick={() => {
            noteForUpdate(note)
          }}
          className="px-4 py-2 text-sm font-medium text-gray-300
          border border-gray-700 rounded-lg
          hover:bg-gray-800 hover:text-white transition"
        >
          Update
        </button>

        <button
          onClick={() => {
            deleteNote(note._id);
          }}
          className="px-4 py-2 text-sm font-medium text-red-400
          border border-gray-800 rounded-lg
          hover:bg-red-500/10 hover:text-red-300 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
