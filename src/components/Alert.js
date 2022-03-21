import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function Alert() {
  const context = useContext(noteContext);
  const { alert } = context;
  return (
    alert && (
      <>
        <div
          className={`alert alert-${alert.type}  alert-dismissible fade show`}
          role="alert"
        >
          {alert.message}
        </div>
      </>
    )
  );
}

export default Alert;
