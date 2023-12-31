import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import '../Style/Signup.css'
const Signup = () => {
  const [credential, setcredential] = useState({ name: "", email: "", password: "", confirmpassword: "" });
  let Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credential;

    try {
      const response = await axios.post("http://localhost:1000/api/auth/createuser", {
        name,
        email,
        password,
      });

      const json = response.data;

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        Navigate('/login');
        // props.showAlert("Account created successfully", "success");
        // Show a success toast
        toast.success("Account created successfully");
      } else {
        // props.showAlert("Invalid Credentials", "danger");
        // Show an error toast
        toast.error("User already exists");
      }
    } catch (error) {
      console.error("API Error:", error);
      // props.showAlert("An error occurred while signing up", "danger");
      // Show an error toast
      toast.error("An error occurred while signing up");
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { name, email, password } = credential
  //   // console.log(credential);
  //   const response = await fetch("http://localhost:1000/api/auth/createuser", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, email, password }),
  //   });
  //   console.log(credential);
  //   console.log(response)
  //   const json = await response.json();


  //   if (json.success) {
  //     //save the auth token and redirect
  //     localStorage.setItem('token', json.authtoken);
  //     Navigate('/login');
  //     props.showAlert("Account crreated successfully", "success")

  //   }
  //   else {
  //     props.showAlert("Invalid Credentials", "danger")
  //   }
  // };
  const onChange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })
  }
  return (
    <div className="signup_container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          {/* <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="password"
            className="form-label">
            Password
          </label>
          <input type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password"
            className="form-label">
            Confirm Password
          </label>
          <input
            type="confirmpassword"
            className="form-control"
            id="confirmpassword"
            name="confirmpassword"
            onChange={onChange} minLength={5} required
          />
        </div>
        <button type="submit" className="signup_btn">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
