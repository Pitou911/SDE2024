import React, { useState } from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Cases from "./pages/Cases";
import Contact from "./components/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./components/AuthContext";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false); // Set authentication state to false
  };
  return (
    <AuthProvider>
      <Router>
        <Nav isAuthenticated={isAuthenticated} onLogout={handleLogout}/>
        {/* <Landing /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route 
          path="/cases" 
          element={isAuthenticated ? <Cases /> : <Navigate to="/login" />} 
        />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated}/>}/>
        </Routes>
        <Contact/>
      </Router>
    </AuthProvider>
  );
};

export default App;
