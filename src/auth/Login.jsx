import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext"; 
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth(); // Get auth methods
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Navigate to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = storedUsers.find(
      (u) =>
        u.email === formData.email &&
        u.password === formData.password
    );

    if (matchedUser) {
      login(matchedUser); // Set the user context
      toast.success("Login successful!");
    } else {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-center mb-4">Login</h3>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="px-4 py-2 rounded-xl bg-white/70 placeholder:text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="px-4 py-2 rounded-xl bg-white/70 placeholder:text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <button className="mt-2 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all">
          Login
        </button>
      </form>
      <p className="text-sm text-center mt-4 text-gray-700">
        Don’t have an account?{" "}
        <Link to="/auth/register" className="text-purple-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
