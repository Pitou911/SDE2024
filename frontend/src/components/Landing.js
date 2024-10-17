import React from "react";
import logo from "./../assets/imgs/logo.png";
import "./Landing.css";
function Landing() {
  return (
    <div className='landing__page'>
      <div className='landing__page--description'>
        <div className='landing__page--description--title'>
          <h1 className='title'>welcome to carenest</h1>
        </div>
        <div className='landing__page--description--slogan'>
          <p>
            Your trusted partner in healthcare solutions. We're committed to
            delivering reliable and personalized healthcare services to meet
            your needs, ensuring you receive the best possible care.
          </p>
        </div>
        <div className='landing__page--description--btns'>
          <div className='landing__page--description--btn--login'>
            <button className='title'>Login</button>
          </div>
          <div className='landing__page--description--btn--register'>
            <button className='title'>Register</button>
          </div>
        </div>
      </div>
      <div className='landing__page--logo'>
        <img src={logo}></img>
      </div>
    </div>
  );
}

export default Landing;
