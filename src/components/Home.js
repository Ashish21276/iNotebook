import React, { useContext, useEffect } from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Home = () => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { name, getNotes, notes, getUser } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [notes]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="container text-center">
        <h1>WelCome {name}</h1>

        <AddNote />

        <Notes />
      </div>
    </>
  );
};

export default Home;
