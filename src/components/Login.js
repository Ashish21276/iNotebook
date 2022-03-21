import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { setName, showAlert } = context;

  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.authToken);
      setName(data.name);
      navigate("/");
      showAlert("success", "Loggedin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <div className="text-center my-5">
        <h1 className="my-5">Login To Continue</h1>
        <div className="warper">
          <form onSubmit={handleOnSubmit}>
            <div className="my-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={credential.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credential.password}
                onChange={handleOnChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-50 my-3">
              Submit
            </button>
          </form>
          <NavLink className="nav-link" style={{ color: "white" }} to="/signup">
            Not Registerd SignUp
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Login;
