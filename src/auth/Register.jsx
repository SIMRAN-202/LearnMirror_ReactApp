import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      toast.error("This Email already exists");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Successfully registered!");
    navigate("/auth/login");
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-center mb-4">Register</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="px-4 py-2 rounded-xl bg-white/70 placeholder:text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="px-4 py-2 rounded-xl bg-white/70 placeholder:text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="px-4 py-2 rounded-xl bg-white/70 placeholder:text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="px-4 py-2 rounded-xl bg-white/70 placeholder:text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button className="mt-2 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-all">
          Register
        </button>
      </form>
      <p className="text-sm text-center mt-4 text-gray-700">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-pink-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
