import React from "react";
import "./Home.css";
import Landing from "../components/Landing";
import Mission from "../components/Mission";
function Home() {
  return (
    <div className='home-page'>
      <Landing />
      <Mission/>
    </div>
  );
}

export default Home;
