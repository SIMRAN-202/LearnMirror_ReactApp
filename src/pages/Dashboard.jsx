import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSearch, FaTrash, FaExternalLinkAlt, FaPlus, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/Authcontext';
import { toast } from 'react-toastify';
import FeatureCard from '../components/FeatureCard';
import background from '../assets/images/profile.jpg';
import LearningGoals from '../components/LearningGoals';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [reflections, setReflections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const todayMood = localStorage.getItem('todayMood') || 'Not set yet';
  const streak = localStorage.getItem('journalStreak') || 0;

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem('learningGoals')) || [];
    const storedReflections = JSON.parse(localStorage.getItem('reflections')) || [];
    setGoals(storedGoals);
    setReflections(storedReflections);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/auth/login');
  };

  const deleteReflection = (id) => {
    const updated = reflections.filter(ref => ref.id !== id);
    setReflections(updated);
    localStorage.setItem('reflections', JSON.stringify(updated));
  };

  const filteredReflections = reflections
  .filter((r) => (r.title || '').toLowerCase().includes(searchTerm.toLowerCase()))
  .slice(0, 3);


  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full mx-auto p-8 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/10 border border-white/30 text-white">

        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-white/30 pb-4">
          <div>
            <h1 className="text-4xl font-bold text-sky-900">
              Welcome, {user?.name || 'Friend'}
            </h1>
            <p className="text-gray-700 mt-2">Hope you're having a peaceful day</p>
          </div>

          <div className="relative flex items-center gap-4">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-sky-900 hover:text-sky-800 transition text-lg"
            >
              <FaUserCircle className="text-3xl" />
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm"
            >
              Logout
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-40 bg-white text-sky-900 rounded-md shadow-lg z-50">
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-sky-100" onClick={() => setDropdownOpen(false)}>Profile</Link>
                <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-sky-100" onClick={() => setDropdownOpen(false)}>Settings</Link>
              </div>
            )}
          </div>
        </div>

        {/* Quote of the Day */}
        <div className="text-center my-6">
          <h2 className="text-lg font-semibold mb-2 text-sky-900">🌟 Quote of the Day</h2>
          <p className="italic text-gray-700">"Growth is never by mere chance; it is the result of forces working together."</p>
        </div>

        {/* Quick Access */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 w-full">
          <FeatureCard label="Memory Mirror" to="/memory-mirror" />
          <FeatureCard label="Mood Tracker" to="/mood-tracker"  />
          <FeatureCard label="Reflection Journal" to="/reflection-journal" />

        </div>

        <div className="w-full mb-9">
          <div className="p-4">
            <h3 className="text-3xl font-semibold text-sky-950 mb-2">Reflections</h3>
            <div className="flex items-center gap-2 mb-4 bg-white/30 p-2 rounded">
              <FaSearch className="text-sky-900" />
              <input
                type="text"
                placeholder="Search reflections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sky-900 placeholder-sky-700 outline-none"
              />
            </div>
            <ul className="space-y-3">
              {filteredReflections.length === 0 ? (
                <li className="text-sky-700 italic">No reflections found.</li>
              ) : (
                filteredReflections?.map((ref) => (
                  <li key={ref.id} className="flex justify-between items-center bg-white/30 p-2 rounded text-sky-900">
                    <div className="truncate w-2/3">
                      <span className="font-medium">"{(ref.title || 'No content').slice(0, 50)}..."</span>
                      <p className="text-xs text-sky-800">{ref.date || 'Unknown date'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => navigate(`/reflection-journal/${ref.id}`)} className="text-sky-800 hover:text-sky-900" title="View"><FaExternalLinkAlt /></button>
                      <button onClick={() => deleteReflection(ref.id)} className="text-red-600 hover:text-red-800" title="Delete"><FaTrash /></button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

        </div>

        {/* Mood & Streak */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className=" p-4 ">
            <h3 className="text-3xl font-semibold text-sky-950 mb-2">Today's Mood </h3>
            <p className="text-sky-900 mb-1">You logged: <strong>{todayMood}</strong></p>
            <p className="text-sm text-gray-700">Reflect on how you're feeling and track emotional trends.</p>
          </div>
          <div className="p-4">
            <h3 className="text-3xl font-semibold text-sky-950 mb-2">Reflection Streak </h3>
            <p className="text-sky-900">You've journaled for <strong>{streak} day(s)</strong> in a row!</p>
          </div>
        </div>

        
        <LearningGoals />
      </div>
    </div>
  );
};

export default Dashboard;
