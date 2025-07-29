import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/Authcontext';
import {
  FaEdit,
  FaSignOutAlt,
  FaAward,
  FaBookReader,
  FaArrowLeft,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import background from '../assets/images/profile.jpg';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();



  const reflectionsCount = JSON.parse(localStorage.getItem('reflections') || '[]').length;
const memoriesCount = JSON.parse(localStorage.getItem('memories') || '[]').length;
const moodsCount = JSON.parse(localStorage.getItem('moods') || '[]').length;


  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full mx-auto p-8 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/10 border border-white/30 text-white">
        {/* Header */}
        <div className="flex items-center space-x-6 border-b border-white/30 pb-6 mb-6">
          <img
            src={user?.photoURL || '/profile-default.png'}
            alt="User Avatar"
            className="w-30 h-30 rounded-full border-4 border-sky-900"
          />
          <div>
            <h2 className="text-2xl font-bold text-sky-900">{user?.name || 'Learner'}</h2>
            <p className="text-sky-900">{user?.email}</p>
            <p className="mt-1 italic text-sky-900">"Keep learning, keep growing!"</p>
          </div>
          <div className="ml-auto flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-sky-100 hover:bg-sky-200 text-sky-900 px-4 py-2 rounded-full flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Dashboard
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-full flex items-center"
            >
              <FaEdit className="mr-2" /> Edit Profile
            </button>
          </div>
        </div>

       <div className="mt-6  p-6 ">
        <h3 className="text-2xl font-bold mb-4 text-sky-950 ">Your Activity Summary</h3>
        <ul className="space-y-2 text-sky-900 text-base">
          <li className="flex items-center text-xl">
            <FaBookReader className="mr-2 text-sky-900 " /> Reflections written: {reflectionsCount}
          </li>
          <li className="flex items-center text-xl">
            <FaAward className="mr-2 text-sky-900" /> Memories saved: {memoriesCount}
          </li>
          <li className="flex items-center text-xl">
            <FaEdit className="mr-2 text-sky-900" /> Mood entries: {moodsCount}
          </li>
        </ul>
      </div>

        <div className="mt-10 text-right">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full flex items-center ml-auto"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
