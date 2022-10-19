import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_BACKEND_API;
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  //Get all notes
  const getNotes = async () => {
    //Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("auth-token"),
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  //Add new note
  const addNote = async (title, description) => {
      //Api call
      const response = await fetch(`${host}/api/notes/addnewnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({title,description}),
      });
       // Logic to add in client side
 
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  //Edit note
  const editNote = async (id, title, description) => {
    //Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({title,description}),
    });
    const json = await response.json();
let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        break;
      }
     
    }
    setNotes(newNotes)
  };

  //Delete note
  const deleteNote = async (id) => {
        //Api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
            localStorage.getItem("auth-token"),
          }
        });
        const json = await response.json();
        console.log(json);
        //delete in client side
        const newNotes = notes.filter((note) => {
          return note._id !== id;
        });
        setNotes(newNotes);
      };
      

  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
