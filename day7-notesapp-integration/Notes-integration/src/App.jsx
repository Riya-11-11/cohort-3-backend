import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import NoteCard from "./components/NoteCard";

const App = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });

  const [updateNoteId, setUpdateNoteId] = useState(null);

  const [allNotes, setAllNotes] = useState([]);

  const handleChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getAllNotes = async () => {
    try {
      let res = await axios.get("http://localhost:3000/notes/allNotes");
      // console.log(res);
      setAllNotes(res.data.data);
    } catch (error) {
      console.log("Error in getting all notes api", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updateNoteId) {
      //api call for update note
      let res = await axios.put(
        `http://localhost:3000/notes/${updateNoteId}`,
        formValues,
      );
      console.log(res);
      setUpdateNoteId(null);
    } else {
      //api call for create note
      let res = await axios.post(
        "http://localhost:3000/notes/create",
        formValues,
      );
      console.log(res);
    }

    //api call
    let res = await axios.post(
      "http://localhost:3000/notes/create",
      formValues,
    );
    console.log(res);

    setFormValues({
      title: "",
      description: "",
    });

    getAllNotes();
  };

  let deleteNote = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:3000/notes/${id}`);
      console.log(res);
      getAllNotes();
    } catch (error) {
      console.log("Error in delete note", error);
    }
  };

  let noteForUpdate = (note) => {
    console.log(note);
    setUpdateNoteId(note._id);
    setFormValues({
      title: note.title,
      description: note.description,
    });
  };

  // let updateNote = async (id) => {
  //   try {
  //     let res = await axios.patch(`http://localhost:3000/notes/${id}/single`);
  //     console.log(res);
  //     // getAllNotes();
  //   } catch (error) {
  //     console.log("Error in update note", error);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Notes App</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Create and manage your notes easily.
          </p>
        </div>

        {/* Note Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-medium mb-5">Create a new note</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              onChange={handleChange}
              name="title"
              value={formValues.title}
              type="text"
              placeholder="Note title"
              className="w-full bg-gray-950 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            <input
              required
              minLength={20}
              onChange={handleChange}
              name="description"
              value={formValues.description}
              type="text"
              placeholder="Write your note..."
              className="w-full bg-gray-950 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 resize-none outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg py-3 transition"
            >
              {updateNoteId ? "Update Note" : "Add Note"}
            </button>
          </form>
          <div>
            {allNotes.map((val) => (
              <NoteCard
                key={val._id}
                note={val}
                deleteNote={deleteNote}
                noteForUpdate={noteForUpdate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
