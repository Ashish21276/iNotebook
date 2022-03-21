import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [name, setName] = useState("");
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      type,
      message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const getUser = async () => {
    const res = await fetch(`http://localhost:5555/getuser`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setName(data.name);
  };

  const getNotes = async () => {
    const res = await fetch(`http://localhost:5555/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setNotes(data);
  };

  const addNote = async (title, description, tag) => {
    const res = await fetch(`http://localhost:5555/addnote`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    if (res.status === 400) {
      showAlert("danger", "Something went wrong");
    } else {
      showAlert("success", "Note Added Successfully");
    }
  };

  const deleteNote = async (id) => {
    const res = await fetch(`http://localhost:5555/deletenode/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  const editNote = async (id, title, description, tag) => {
    const res = await fetch(`http://localhost:5555/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await res.json();
    let newNote = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNote.length; index++) {
      if (newNote[index]._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        setNotes,
        setName,
        name,
        alert,
        setAlert,
        showAlert,
        getUser,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
