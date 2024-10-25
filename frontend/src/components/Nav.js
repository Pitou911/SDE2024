import React from "react";
import "./Nav.css";
import logo from "./../assets/imgs/logo.png";
import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <header className='navbar--header'>
      <div className='navbar'>
        <div className='navbar__logo'>
          <div className='navbar__logo--img'>
            <Link to='/'>
              <img src={logo}></img>
            </Link>
          </div>
          <div className='navbar__logo--title title'>
            <Link to='/'>
              <h2>CareNest</h2>
            </Link>
          </div>
        </div>
        <ul className='navbar__lists'>
          <li className='navbar__list title'>
            <Link to='/'>Home</Link>
          </li>
          <li className='navbar__list title'>
            <Link to='/cases'>Cases</Link>
          </li>
          <li className='navbar__list title'>
            <Link to='/about'>About us</Link>
          </li>
          <li className='navbar__list title'>
            <Link to='/login'>Log in</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
