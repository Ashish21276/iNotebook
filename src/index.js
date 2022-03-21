import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import NoteState from "./context/notes/NoteState";

ReactDOM.render(
  <BrowserRouter>
    <NoteState>
      <App />
    </NoteState>
  </BrowserRouter>,
  document.getElementById("root")
);
