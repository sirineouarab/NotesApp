import React, { useState, useEffect } from "react";
import SingleNote from "./SingleNote";
import PostInput from "./PostInput";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const API_URL = import.meta.env.VITE_REACT_API_URL;

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNotes(data.reverse());
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (index) => {
    const noteToDelete = notes[index];

    try {
      await fetch(`${API_URL}/${noteToDelete._id}`, {
        method: "DELETE",
      });

      const newNotes = [...notes];
      newNotes.splice(index, 1);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const addNote = async (newNote) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        const createdNote = await response.json();
        setNotes([createdNote, ...notes]);
      } else {
        console.error("Failed to add note:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div>
      <PostInput addNote={addNote} />
      <div className="catalog">
        {notes.map((note, index) => (
          <SingleNote
            key={note._id}
            index={index}
            title={note.title}
            content={note.content}
            color={note.color}
            deleteNote={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}

export default Notes;
