import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <>
      <div className="col-4 text-white">
        <div
          className="card my-2"
          style={{ backgroundColor: "#656b7f", borderRadius: "17px" }}
        >
          <div className="card-body">
            <h5 className="card-title">
              {note.title}
              <i
                style={{ cursor: "pointer" }}
                className="fa-solid fa-xs fa-pen-to-square mx-2 "
                onClick={() => updateNote(note)}
              ></i>
              <i
                style={{ cursor: "pointer" }}
                className="fa-solid fa-xs fa-trash mx-2 "
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
            </h5>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
