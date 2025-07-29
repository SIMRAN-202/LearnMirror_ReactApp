import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import background from '../assets/images/profile.jpg';
import { FaArrowLeft, FaSave, FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, photoURL: imageURL }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUserIndex = users.findIndex(u => u.email === user.email);
    if (currentUserIndex === -1) {
      return setError('User not found.');
    }

    const updatedUser = { ...users[currentUserIndex], ...formData };

    // Password logic
    if (passwords.current || passwords.new || passwords.confirm) {
      if (passwords.current !== users[currentUserIndex].password) {
        return setError('Current password is incorrect.');
      }
      if (passwords.new !== passwords.confirm) {
        return setError('New passwords do not match.');
      }
      updatedUser.password = passwords.new;
    }

    // Update users array
    users[currentUserIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));

    // Update session user
    updateUser(updatedUser);
    toast.success('Profile updated successfully!');
    navigate('/profile');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full mx-auto p-8 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/10 border border-white/30 text-white max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/30 pb-6 mb-6">
          <h2 className="text-3xl font-bold text-sky-900">Settings</h2>
          <button
            onClick={() => navigate('/profile')}
            className="bg-sky-100 hover:bg-sky-200 text-sky-900 px-4 py-2 rounded-full flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Profile
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <img
              src={formData.photoURL || '/profile-default.png'}
              alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-sky-900 object-cover"
            />
            <label className="mt-3 cursor-pointer text-sky-900 bg-sky-100 hover:bg-sky-200 px-4 py-2 rounded-full flex items-center">
              <FaUpload className="mr-2" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sky-900 font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-white/30 bg-white/20 text-sky-900 placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block mb-1 text-sky-900 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-white/30 bg-white/20 text-sky-900 placeholder-gray-600"
              />
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white/20 p-4 rounded-lg border border-white/30">
            <h3 className="text-xl font-semibold text-sky-900 mb-4">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                placeholder="Current Password"
                className="p-3 rounded-md border border-white/30 bg-white/20 text-sky-900 placeholder-gray-600"
              />
              <input
                type="password"
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
                placeholder="New Password"
                className="p-3 rounded-md border border-white/30 bg-white/20 text-sky-900 placeholder-gray-600"
              />
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                placeholder="Confirm New Password"
                className="p-3 rounded-md border border-white/30 bg-white/20 text-sky-900 placeholder-gray-600"
              />
            </div>
            {error && <p className="text-red-400 mt-2">{error}</p>}
          </div>

          {/* Save Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full flex items-center justify-center ml-auto"
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
