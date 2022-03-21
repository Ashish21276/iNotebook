import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Signup = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { showAlert } = context;

  const [credential, setCredential] = useState({
    email: "",
    password: "",
    name: "",
    cpassword: "",
  });

  const handleOnChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (credential.cpassword !== credential.password) {
      return showAlert(
        "danger",
        "Password and Confirm password should be same"
      );
    }

    const res = await fetch("http://localhost:5555/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
        cpassword: credential.cpassword,
        name: credential.name,
      }),
    });
    const data = await res.json();
    if (data.success) {
      navigate("/login");
      showAlert("success", "You have successfully registered");
    } else {
      showAlert("danger", "Something went wrong");
    }
  };
  return (
    <>
      <div className="text-center my-5">
        <h1 className="my-5">Sign Up</h1>
        <div className="warper">
          <form onSubmit={handleOnSubmit}>
            <div className="my-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={credential.name}
                onChange={handleOnChange}
                required
                minLength={5}
              />
            </div>
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
                required
                minLength={5}
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
                required
                minLength={5}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="cpassword"
                value={credential.cpassword}
                onChange={handleOnChange}
                required
                minLength={5}
              />
            </div>

            <button type="submit" className="btn btn-primary w-50 my-3">
              Submit
            </button>
          </form>
          <NavLink className="nav-link" style={{ color: "white" }} to="/login">
            Already Registerd Login
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Signup;
