import React, { useContext, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, editNote } = context;
  const [data, setData] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleOnClick = () => {
    editNote(data.id, data.etitle, data.edescription, data.etag);
    refClose.current.click();
  };

  const updateNote = (note) => {
    ref.current.click();
    setData({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  const handlOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ backgroundColor: "rgb(85 149 203)" }}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 ">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    onChange={handlOnChange}
                    value={data.etitle}
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    onChange={handlOnChange}
                    value={data.edescription}
                    type="text"
                    name="edescription"
                    className="form-control"
                    id="edescription"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    onChange={handlOnChange}
                    value={data.etag}
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOnClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="my-3">Your Notes</h1>
      <div className="row">
        {notes.map((note, id) => {
          return (
            <NoteItem
              key={id}
              updateNote={() => updateNote(note)}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
