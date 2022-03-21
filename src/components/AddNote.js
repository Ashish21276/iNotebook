import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const context = useContext(noteContext);
  const { addNote, showAlert } = context;

  const handleOnClick = (e) => {
    e.preventDefault();
    addNote(data.title, data.description, data.tag);
    setData({
      title: "",
      description: "",
      tag: "",
    });
  };

  const handlOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="container mt-5 ">
        <form>
          <div className="mb-3 ">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              onChange={handlOnChange}
              value={data.title}
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              onChange={handlOnChange}
              value={data.description}
              type="text"
              name="description"
              className="form-control"
              id="description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Tag
            </label>
            <input
              onChange={handlOnChange}
              value={data.tag}
              type="text"
              className="form-control"
              id="tag"
              name="tag"
            />
          </div>

          <button
            type="submit"
            onClick={handleOnClick}
            className="btn btn-primary"
          >
            Add One
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
