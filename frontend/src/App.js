import React from "react";
import Predictor from "./components/Predictor";
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

const App = () => {
  return (
    <Router>
      <Nav />
      {/* <Landing /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cases' element={<Cases />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
