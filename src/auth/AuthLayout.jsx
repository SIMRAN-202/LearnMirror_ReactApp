import React from "react";
import { Outlet } from "react-router-dom";
import background from '../assets/images/bg.avif'

const AuthLayout = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-8"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/20">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6 tracking-wide">
          Welcome to <span className="text-purple-700">LearnMirror</span>
        </h2>
        <Outlet />
        <p className="text-center text-xs text-gray-700 mt-6 font-medium">
          Made with ❤️ for Hackathon 2025
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
