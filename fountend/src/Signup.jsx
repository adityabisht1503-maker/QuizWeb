import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import api from "./api";

const Signup = () => {

  const swan = ()=>{
    Swal.fire({
  title: "Sign up Successfull",
  icon: "success",
  draggable: true
});
  }
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = form;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/signup", form);

      // Assuming API returns success with status or message
      if (res.data?.status === 1 || res.data?.message === "Signup successful") {
        swan()

        navigate("/login");
      } else {
        toast.error(res.data?.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);

      // Check for duplicate email or other API errors
      if (error.response?.status === 409) {
        toast.error("Email already exists. Please use another email or login.");
      } else {
        toast.error(error.response?.data?.message || "Signup failed.");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Create Account</h3>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              required
              value={name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              required
              value={email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              required
              value={password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>

          <div className="text-center mt-3">
            <small>
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
