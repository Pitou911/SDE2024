import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./components/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./components/AuthContext";
import ParentComponent from "./pages/ParentComponent";
import Profile from "./pages/Profile";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true' ||
    sessionStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isAuthenticated');
    localStorage.removeItem('student_id');
    sessionStorage.removeItem('student_id');
    window.location.href = '/';
  };

  const handleSetAuthentication = (authenticated, rememberMe) => {
    setIsAuthenticated(authenticated);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('isAuthenticated', authenticated);
  };

  return (
    <AuthProvider>
      <Router>
        <MainContent 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout} 
          setIsAuthenticated={handleSetAuthentication} 
        />
      </Router>
    </AuthProvider>
  );
};

const MainContent = ({ isAuthenticated, onLogout, setIsAuthenticated }) => {
  const location = useLocation();
  const hideNavAndContact = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavAndContact && <Nav isAuthenticated={isAuthenticated} onLogout={onLogout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cases" element={isAuthenticated ? <ParentComponent /> : <Navigate to="/login" />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/profile" element={<Profile setIsAuthenticated={setIsAuthenticated} onLogout={onLogout}/>}/>
        <Route path="/register" element={<Register />} />
      </Routes>
      {!hideNavAndContact && <Contact />}
    </>
  );
};

export default App;
