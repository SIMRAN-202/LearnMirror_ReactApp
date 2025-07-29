import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MemoryMirror from "./pages/MemoryMirror";
import MoodTracker from "./pages/MoodTracker";
import Profile from "./pages/Profile";
import ReflectionJournal from "./pages/ReflectionJournal";
import Settings from "./pages/Settings";

import Login from "./auth/Login";
import Register from "./auth/Register";
import AuthLayout from "./auth/AuthLayout";

import { AppProvider } from "./context/AppContext";
import { AuthProvider, useAuth } from "./context/Authcontext";

// 🔐 Protected route wrapper
const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/auth/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="app-container">
            <Routes>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
              <Route path="/memory-mirror" element={<PrivateRoute element={<MemoryMirror />} />} />
              <Route path="/mood-tracker" element={<PrivateRoute element={<MoodTracker />} />} />
              <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
              <Route path="/reflection-journal" element={<PrivateRoute element={<ReflectionJournal />} />} />
              <Route path="/reflection-journal/:id" element={<PrivateRoute element={<ReflectionJournal />} />} />
              <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />

              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
