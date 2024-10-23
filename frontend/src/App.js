import React from "react";
import Predictor from "./components/PredictComp";
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
import PredictComp from "./components/PredictComp";
import Contact from "./components/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
const App = () => {
  return (
    <Router>
      <Nav />
      {/* <Landing /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cases' element={<Cases />} />
        <Route path='/about' element={<About />} />
        <Route path='/predict' element={<PredictComp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Contact/>
    </Router>
  );
};

export default App;
